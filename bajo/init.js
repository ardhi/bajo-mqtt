async function connHandler ({ item, options }) {
  const { error, generateId } = this.app.bajo
  const { isString, has } = this.app.bajo.lib._
  if (isString(item)) item = { url: item }
  if (!has(item, 'url')) throw error('Connection must have url')
  item.options = item.options ?? {}
  if (!item.options.clientId) item.options.clientId = generateId()
}

async function subsHandler ({ item }) {
  const { error } = this.app.bajo
  const { has, find } = this.app.bajo.lib._
  if (!has(item, 'connection')) item.connection = 'default'
  if (!has(item, 'topic')) throw error('Subscription must have a topic')
  if (!find(this.connections, { name: item.connection })) throw error('Connection \'%s\' not found', item.connection)
}

async function init () {
  const { buildCollections } = this.app.bajo
  this.connections = await buildCollections({ ns: this.name, handler: connHandler })
  this.subscriptions = await buildCollections({ ns: this.name, handler: subsHandler, container: 'subscriptions' })
}

export default init
