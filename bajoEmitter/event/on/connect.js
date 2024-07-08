const onConnect = {
  handler: function bajoMqttOnConnect (conn) {
    const { find } = this.app.bajo.helper._
    this.log.debug('Connection \'%s\' is connected', conn.name)
    const c = find(this.connections, { name: conn.name })
    if (!c) return
    for (const s of this.subscribers) {
      if (s.connection !== conn.name) continue
      c.instance.subscribe(s.topic)
      this.log.debug('Subscribed to \'%s:%s\'', conn.name, s.topic)
    }
  },
  level: 1
}

export default onConnect
