const path = require('path')

async function prep () {
  const { _, getConfig, error } = this.bajo.helper
  const config = getConfig('bajoMqtt')
  if (!config.connections) return
  if (!_.isArray(config.connections)) config.connections = [config.connections]
  for (let c of config.connections) {
    if (_.isString(c)) c = { url: c }
    if (!_.has(c, 'name')) {
      if (_.find(config.connections, { name: 'default' })) throw error('Connection \'default\' already exists', { code: 'BAJOMQTT_CONNECTION_ALREADY_EXISTS' })
      else c.name = 'default'
    }
    c.options = c.options || {}
    if (!c.options.clientId) c.options.clientId = this.bajoExtra.helper.generateId()
  }
  const names = _.map(config.connections, 'name')
  const uniqNames = _.uniq(names)
  if (names.length !== uniqNames.length) throw error(`One or more connections shared the same names`, { code: 'BAJOMQTT_CONNECTION_NAME_CLASH' })
}

async function build () {
  const { _, fastGlob, getConfig, walkBajos, error } = this.bajo.helper
  const { events } = this.bajoMqtt.helper
  const config = getConfig('bajoMqtt')

  this.bajoMqtt.event = {}
  await walkBajos(async function (n) {
    const cfg = getConfig(n)
    const files = await fastGlob(`${cfg.dir}/bajoMqtt/event/*.js`)
    for (const f of files) {
      let [base, conn] = path.basename(f, '.js').split('@')
      if (!events.includes(base)) continue
      if (!conn) conn = 'default'
      let mod = require(f)
      if (_.isFunction(mod)) mod = { handler: mod }
      if (!mod.handler) throw error('No handler provided', { code: 'BAJOMQTT_NO_HANDLER_PROVIDED' })
      if (!this.bajoMqtt.event[base]) this.bajoMqtt.event[base] = []
      if (conn === 'all') conn = _.map(config.connections, 'name')
      else conn = conn.split(',')
      for (const c of conn) {
        this.bajoMqtt.event[base].push(_.merge({}, mod, { connection: c }))
      }
    }
  })

  this.bajoMqtt.subscribe = {}
  await walkBajos(async function (n) {
    const cfg = getConfig(n)
    const files = await fastGlob(`${cfg.dir}/bajoMqtt/subscribe/*.js`)
    // TODO: topic with special chars
    for (const f of files) {
      let [base, conn] = path.basename(f, '.js').split('@')
      base = base.replace(/\-/g, '/') // base = topic
      if (!conn) conn = ['default']
      else conn = conn.split(',')
      let mod = require(f)
      let subs = []
      if (_.isFunction(mod)) mod = mod.length === 0 ? await mod.call(this) : { handler: mod }
      if (_.isPlainObject(mod)) {
        if (!mod.topic) mod.topic = base
        if (!mod.connection) mod.connection = conn
        else if (_.isFunction(mod.topic)) mod.topic = await mod.topic.call(this)
        subs.push(mod)
      } else if (_.isArray(mod)) subs = mod
      for (const s of subs) {
        this.bajoMqtt.helper.subscribe(s)
      }
    }
  })

  /*
  this.addHook('onClose', async (scp, done) => {
    Promise.all(_.map(_.keys(client), i => {
      return new Promise((resolve, reject) => {
        this.bajo.log.debug(`Closing MQTT connection '${i}'`)
        client[i].end(true) // do we have to wait?
        resolve()
      })
    })).then(() => {
      done()
    })
  })
  */
}

module.exports = async function () {
  await prep.call(this)
  await build.call(this)
}
