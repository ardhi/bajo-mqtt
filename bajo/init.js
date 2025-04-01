async function connHandler ({ item, options }) {
  const { generateId } = this.app.bajo
  const { isString, has } = this.lib._
  if (isString(item)) item = { url: item }
  if (!has(item, 'url')) throw this.error('connMustHave%s', 'url')
  item.options = item.options ?? {}
  if (!item.options.clientId) item.options.clientId = generateId()
}

async function subsHandler ({ item }) {
  const { has, find } = this.lib._
  if (!has(item, 'connection')) item.connection = 'default'
  if (!has(item, 'topic')) throw this.error('subscriptionMustHave%s', 'topic')
  if (!find(this.connections, { name: item.connection })) throw this.error('notFound%s%s', this.print.write('Connection'), item.connection)
}

async function init () {
  const { buildCollections } = this.app.bajo
  this.connections = await buildCollections({ ns: this.name, handler: connHandler, container: 'connections' })
  this.subscriptions = await buildCollections({ ns: this.name, handler: subsHandler, container: 'subscriptions' })
}

export default init
