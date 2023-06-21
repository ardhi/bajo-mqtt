import path from 'path'

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

async function getEvents ({ file }) {
  const { _, error, importModule, getConfig } = this.bajo.helper
  const { events } = this.bajoMqtt.helper
  const config = getConfig('bajoMqtt')
  this.bajoMqtt.event = this.bajoMqtt.event || {}

  let [base, conn] = path.basename(file, '.js').split('@')
  if (!events.includes(base)) return undefined
  if (!conn) conn = 'default'
  let mod = await importModule(file)
  if (_.isFunction(mod)) mod = { handler: mod }
  if (!mod.handler) throw error('No handler provided', { code: 'BAJOMQTT_NO_HANDLER_PROVIDED' })
  if (!this.bajoMqtt.event[base]) this.bajoMqtt.event[base] = []
  if (conn === 'all') conn = _.map(config.connections, 'name')
  else conn = conn.split(',')
  for (const c of conn) {
    this.bajoMqtt.event[base].push(_.merge({}, mod, { connection: c }))
  }
}

async function getSubscribers ({ file }) {
  const { _, importModule } = this.bajo.helper
  this.bajoMqtt.subscriber = this.bajoMqtt.subscriber || {}

  let [base, conn] = path.basename(file, '.js').split('@')
  base = base.replace(/\-/g, '/') // base = topic
  if (!conn) conn = ['default']
  else conn = conn.split(',')
  let mod = await importModule(file)
  let subs = []
  if (_.isFunction(mod)) mod = mod.length === 0 ? await mod.call(this) : { handler: mod }
  if (_.isPlainObject(mod)) {
    if (!mod.topic) mod.topic = base
    if (!mod.connection) mod.connection = conn
    if (_.isFunction(mod.topic)) mod.topic = await mod.topic.call(this)
    if (mod.topic && mod.connection && mod.handler) subs.push(mod)
  } else if (_.isArray(mod)) subs = mod
  for (const s of subs) {
    this.bajoMqtt.helper.subscribe(s)
  }
}

export default async function () {
  const { walkBajos } = this.bajo.helper
  await prep.call(this)
  await walkBajos(getEvents, { glob: 'event/*.js' })
  await walkBajos(getSubscribers, { glob: 'subscriber/*.js' })
}
