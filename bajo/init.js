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
  const { has, find, isString } = await importPkg('lodash-es')
  if (!has(item, 'connection')) item.connection = 'default'
  if (!find(this.bajoMqtt.connections, { name: item.connection })) throw error('Connection \'%s\' not found', item.connection)
  if (!has(item, 'topic')) throw error('Subscriber must have connection attached')
  if (!has(item, 'broadcastPool')) item.broadcastPool = []
  if (isString(item.broadcastPool)) item.broadcastPool = [item.broadcastPool]
}

async function init () {
  const { buildCollections } = this.bajo.helper
  this.bajoMqtt.connections = await buildCollections({ handler: connHandler, dupChecks: ['name'] })
  this.bajoMqtt.subscribers = await buildCollections({ handler: subsHandler, container: 'subscribers', dupChecks: ['connection', 'topic'] })
}

export default init
