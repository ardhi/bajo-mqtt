import collectSubscribers from '../lib/collect-subscribers.js'

async function connBuilder (c, config) {
  const { importPkg, error, generateId } = this.bajo.helper
  const { isString, has, find, isPlainObject, map } = await importPkg('lodash-es::bajo')
  if (isString(c)) c = { url: c }
  if (!has(c, 'url')) throw error('Connection must have url', { code: 'BAJOMQTT_CONNECTION_MISSING_MISSING' })
  if (!has(c, 'name')) {
    if (find(config.connections, { name: 'default' })) throw error('Connection \'default\' already exists', { code: 'BAJOMQTT_CONNECTION_ALREADY_EXISTS' })
    else c.name = 'default'
  }
  c.options = c.options || {}
  if (!c.options.clientId) c.options.clientId = generateId()
}

async function prepBroadcastPool () {
  const { importPkg, getConfig, error } = this.bajo.helper
  const _ = await importPkg('lodash-es::bajo')
  const opts = getConfig('bajoMqtt')
  let bcs = opts.broadcastPools || []
  if (isPlainObject(bcs)) bcs = [bcs]
  for (const b of bcs) {
    if (!b.name) throw error('A pool must have a name', { code: 'BAJOMQTT_POOL_NAME_MISSING' })
    if (!b.connection) throw error('A pool must be bound to a connection', { code: 'BAJOMQTT_POOL_CONNECTION_MISSING' })
    if (!map(opts.connections, 'name').includes(b.connection)) throw error(`Unknown connection for pool '${b.name}'`, { code: 'BAJOMQTT_POOL_CONNECTION_UNKNOWN' })
    if (!b.topic) throw error('A pool must have topic to send to', { code: 'BAJOMQTT_POOL_TOPIC_MISSING' })
  }
}

async function init () {
  const { eachPlugins, buildConnections } = this.bajo.helper
  await buildConnections('bajoMqtt', connBuilder, ['name'])
  await prepBroadcastPool.call(this)
  await eachPlugins(collectSubscribers, { glob: 'subscriber/*.js' })
}

export default init
