async function connHandler ({ item, options }) {
  const { error, generateId } = this.app.bajo.helper
  const { isString, has } = this.app.bajo.helper._
  if (isString(item)) item = { url: item }
  if (!has(item, 'url')) throw error('Connection must have url')
  item.options = item.options ?? {}
  if (!item.options.clientId) item.options.clientId = generateId()
}

async function subsHandler ({ item }) {
  const { error } = this.app.bajo.helper
  const { has, find } = this.app.bajo.helper._
  if (!has(item, 'connection')) item.connection = 'default'
  if (!has(item, 'topic')) throw error('Subscriber must have a topic')
  if (!find(this.connections, { name: item.connection })) throw error('Connection \'%s\' not found', item.connection)
}

async function init () {
  const { buildCollections } = this.app.bajo.helper
  this.connections = await buildCollections({ ns: this.name, handler: connHandler })
  this.subscribers = await buildCollections({ ns: this.name, handler: subsHandler, container: 'subscribers' })
}

export default init
