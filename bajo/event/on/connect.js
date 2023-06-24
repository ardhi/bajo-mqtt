export default {
  handler: function (conn) {
    const { _, log } = this.bajo.helper
    log.info(`Connected as '%s'`, conn.name)
    const instance = _.find(this.bajoMqtt.instances, { name: conn.name })
    if (!instance) return
    for (const s of this.bajoMqtt.subscribers) {
      if (s.connection !== conn.name) continue
      instance.client.subscribe(s.topic)
      log.info(`Subscribed to '%s:%s'`, conn.name, s.topic)
    }
  },
  level: 1
}