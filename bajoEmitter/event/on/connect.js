const onConnect = {
  handler: async function bajoMqttOnConnect (conn) {
    const { importPkg, log } = this.bajo.helper
    const { find } = await importPkg('lodash-es')
    log.debug('Connected as \'%s\'', conn.name)
    const c = find(this.bajoMqtt.connections, { name: conn.name })
    if (!c) return
    for (const s of this.bajoMqtt.subscribers) {
      if (s.connection !== conn.name) continue
      c.instance.subscribe(s.topic)
      log.debug('Subscribed to \'%s:%s\'', conn.name, s.topic)
    }
  },
  level: 1
}

export default onConnect
