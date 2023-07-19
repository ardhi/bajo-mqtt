import collectSubscribers from '../lib/collect-subscribers.js'

async function handler ({ item, options }) {
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
  const { eachPlugins, buildCollections } = this.bajo.helper
  await buildCollections({ handler, dupChecks: ['name'] })
  await prepBroadcastPool.call(this)
  await eachPlugins(collectSubscribers, { glob: 'subscriber/*.js' })
}

export default init
