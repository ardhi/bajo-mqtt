export default function (topic, handler, conn = 'default', now, publish) {
  const { _, getConfig } = this.bajo.helper
  let opts = _.cloneDeep(topic)
  if (_.isString(topic)) opts = { topic, handler, connection: conn, bindNow: now, publish }
  const config = getConfig('bajoMqtt')
  this.bajoMqtt.subscriber = this.bajoMqtt.subscriber || {}
  if (opts.connection === 'all') opts.connection = _.map(config.connections, 'name')
  else if (_.isString(opts.connection)) opts.connection = opts.connection.split(',')
  if (!this.bajoMqtt.subscriber[opts.topic]) this.bajoMqtt.subscriber[opts.topic] = []
  for (const c of opts.connection) {
    const o = _.pick(opts, ['topic', 'handler', 'publish', 'relay'])
    o.connection = c
    this.bajoMqtt.subscriber[o.topic].push(o)
    if (now) {
      this.bajoMqtt.instance[c].subscribe(o)
      this.bajo.log.info(`Subscribed to '%s:%s'`, conn.name, o.topic)
    }
  }
}
