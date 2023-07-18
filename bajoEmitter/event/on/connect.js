const onConnect = {
  handler: async function (conn) {
    const { importPkg, log } = this.bajo.helper
    const { find } = await importPkg('lodash-es')
    log.info('Connected as \'%s\'', conn.name)
    const instance = find(this.bajoMqtt.instances, { name: conn.name })
    if (!instance) return
    for (const s of this.bajoMqtt.subscribers) {
      if (s.connection !== conn.name) continue
      instance.client.subscribe(s.topic)
      log.info('Subscribed to \'%s:%s\'', conn.name, s.topic)
    }
  },
  level: 1
}

export default onConnect
