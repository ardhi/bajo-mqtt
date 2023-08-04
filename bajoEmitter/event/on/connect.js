const onConnect = {
  handler: async function bajoMqttOnConnect (conn) {
    const { importPkg, log } = this.bajo.helper
    const { find } = await importPkg('lodash-es')
    log.debug('Connected as \'%s\'', conn.name)
    const instance = find(this.bajoMqtt.instances, { name: conn.name })
    if (!instance) return
    for (const s of this.bajoMqtt.subscribers) {
      if (s.connection !== conn.name) continue
      instance.client.subscribe(s.topic)
      log.debug('Subscribed to \'%s:%s\'', conn.name, s.topic)
    }
  },
  level: 1
}

export default onConnect
