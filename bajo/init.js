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

async function getSubscribers ({ file }) {
  const { _, importModule } = this.bajo.helper

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
  await walkBajos(getSubscribers, { glob: 'subscriber/*.js' })
}
