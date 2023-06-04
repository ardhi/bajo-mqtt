module.exports = function (topic, handler, conn = 'default', now, publish) {
  const { _, getConfig } = this.bajo.helper
  let opts = _.cloneDeep(topic)
  if (_.isString(topic)) opts = { topic, handler, connection: conn, bindNow: now, publish }
  const config = getConfig('bajoMqtt')
  this.bajoMqtt.subscribe = this.bajoMqtt.subscribe || {}
  if (opts.connection === 'all') opts.connection = _.map(config.connections, 'name')
  else if (_.isString(opts.connection)) opts.connection = opts.connection.split(',')
  if (!this.bajoMqtt.subscribe[opts.topic]) this.bajoMqtt.subscribe[opts.topic] = []
  for (const c of opts.connection) {
    const o = _.pick(opts, ['topic', 'handler', 'publish', 'relay'])
    o.connection = c
    this.bajoMqtt.subscribe[o.topic].push(o)
    if (now) {
      this.bajoMqtt.instance[c].subscribe(o)
      this.bajo.log.debug(`[MQTT][${conn.name}] subscribed to ${o.topic}`)
    }
  }
}
