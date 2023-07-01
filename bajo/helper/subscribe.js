async function subscribe (topic, handler, conn = 'default', now, publish) {
  const { getPkg, log } = this.bajo.helper
  const _ = await getPkg('lodash')
  let opts = _.cloneDeep(topic)
  if (_.isString(topic)) opts = { topic, handler, connection: conn, bindNow: now, publish }
  this.bajoMqtt.subscribers = this.bajoMqtt.subscribers || []
  if (_.isString(opts.connection)) opts.connection = opts.connection.split(',')
  for (const c of opts.connection) {
    const o = _.pick(opts, ['topic', 'handler', 'publish'])
    o.connection = c
    this.bajoMqtt.subscribers.push(o)
    if (now) {
      const instance = _.find(this.bajoMqtt.instances, { name: c.name })
      if (instance) {
        await instance.client.subscribe(o)
        log.info(`Subscribed to '%s:%s'`, conn.name, o.topic)
      }
    }
  }
}

export default subscribe