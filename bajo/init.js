async function connHandler ({ item, options }) {
  const { importPkg, error, generateId } = this.bajo.helper
  const { isString, has } = await importPkg('lodash-es')
  if (isString(item)) item = { url: item }
  if (!has(item, 'url')) throw error('Connection must have url')
  item.options = item.options ?? {}
  if (!item.options.clientId) item.options.clientId = generateId()
}

async function subsHandler ({ item }) {
  const { importPkg, error, log } = this.bajo.helper
  const { has, find } = await importPkg('lodash-es')
  if (!has(item, 'connection')) item.connection = 'default'
  if (!has(item, 'topic')) throw error('Subscriber must have connection attached')
  if (!find(this.bajoMqtt.connections, { name: item.connection })) {
    log.warn('Connection \'%s\' not found, skipped', item.connection)
    return false
  }
}

async function init () {
  const { buildCollections } = this.bajo.helper
  this.bajoMqtt.connections = await buildCollections({ handler: connHandler })
  this.bajoMqtt.subscribers = await buildCollections({ handler: subsHandler, container: 'subscribers' })
}

export default init
