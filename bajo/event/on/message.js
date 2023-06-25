const message = {
  handler: async function (conn, topic, ...args) {
    const { _ } = this.bajo.helper
    const subs = _.filter(this.bajoMqtt.subscribers, s => s.connection === conn.name && s.topic === topic)
    if (subs.length === 0) return
    for (const s of subs) {
      if (!s.handler) continue
      const result = await s.handler.call(this, ...args)
      if (_.isEmpty(result) || !s.publish) return
      if (_.isString(s.publish)) s.publish = [{ topic: s.publish, connection: conn.name }]
      for (const p of publish) {
        try {
          this.bajoMqtt.helper.publish(p.topic, result, p.connection)
        } catch (err) {}
      }
    }
  },
  level: 1
}

export default message
