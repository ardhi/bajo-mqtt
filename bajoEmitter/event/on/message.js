const message = {
  handler: async function (conn, topic, ...args) {
    const { importPkg } = this.bajo.helper
    const { filter, isEmpty, isString } = await importPkg('lodash-es::bajo')
    const subs = filter(this.bajoMqtt.subscribers, s => s.connection === conn.name && s.topic === topic)
    if (subs.length === 0) return
    for (const s of subs) {
      if (!s.handler) continue
      const result = await s.handler.call(this, ...args)
      if (isEmpty(result) || !s.publish) return
      if (isString(s.publish)) s.publish = [{ topic: s.publish, connection: conn.name }]
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
