async function connHandler ({ item, options }) {
  const { importPkg, error, generateId } = this.bajo.helper
  const { isString, has, find } = await importPkg('lodash-es')
  if (isString(item)) item = { url: item }
  if (!has(item, 'url')) throw error('Connection must have url', { code: 'BAJOMQTT_CONNECTION_MISSING_MISSING' })
  if (!has(item, 'name')) {
    if (find(options.connections, { name: 'default' })) throw error('Connection \'default\' already exists', { code: 'BAJOMQTT_CONNECTION_ALREADY_EXISTS' })
    else item.name = 'default'
  }
  item.options = item.options || {}
  if (!item.options.clientId) item.options.clientId = generateId()
}

async function subsHandler ({ item }) {
  const { importPkg, error } = this.bajo.helper
  const { has, find } = await importPkg('lodash-es')
  if (!has(item, 'connection')) item.connection = 'default'
  if (!find(this.bajoMqtt.connections, { name: item.connection })) throw error('Connection \'%s\' not found', item.connection)
  if (!has(item, 'topic')) throw error('Subscriber must have connection attached')
}

async function prepBroadcastPool () {
  const { importPkg, getConfig, error } = this.bajo.helper
  const { isPlainObject, map } = await importPkg('lodash-es')
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
  const { buildCollections } = this.bajo.helper
  this.bajoMqtt.connections = await buildCollections({ handler: connHandler, dupChecks: ['name'] })
  this.bajoMqtt.subscribers = await buildCollections({ handler: subsHandler, container: 'subscribers', dupChecks: ['connection', 'topic'] })
  await prepBroadcastPool.call(this)
}

export default init
