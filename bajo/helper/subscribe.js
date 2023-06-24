export default function (topic, handler, conn = 'default', now, publish) {
  const { _, log } = this.bajo.helper
  let opts = _.cloneDeep(topic)
  if (_.isString(topic)) opts = { topic, handler, connection: conn, bindNow: now, publish }
  this.bajoMqtt.subscribers = this.bajoMqtt.subscribers || []
  if (_.isString(opts.connection)) opts.connection = opts.connection.split(',')
  for (const c of opts.connection) {
    const o = _.pick(opts, ['topic', 'handler', 'publish'])
    o.connection = c
    this.bajoMqtt.subscribers.push(o)
    if (now) {
      const instance = _.find(this.bajoMqtt.clients, { name: c.name })
      if (instance) {
        instance.client.subscribe(o)
        log.info(`Subscribed to '%s:%s'`, conn.name, o.topic)
      }
    }
  }
}
