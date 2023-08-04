const broadcastPool = {
  level: 1,
  handler: async function bajoEmitterOnBroadcastPool (msg, meta) {
    const { getConfig } = this.bajo.helper
    const { publish } = this.bajoMqtt.helper
    const cfg = getConfig('bajoMqtt')
    if (cfg.broadcastPools.length === 0) return
    for (const b of cfg.broadcastPools) {
      const me = `${b.name}@bajoMqtt.${b.connection}`
      if (meta.receiver.includes(me)) await publish(b.topic, msg, b.connection)
    }
  }
}

export default broadcastPool
