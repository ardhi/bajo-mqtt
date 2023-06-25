const broadcast = {
  level: 1,
  handler: async function (tag, message, ...args) {
    const { _, getConfig } = this.bajo.helper
    const { publish } = this.bajoMqtt.helper
    const opts = getConfig('bajoMqtt')
    const bcs = _.filter(opts.broadcasts, b => b.tags.includes(tag))
    if (bcs.length === 0) return
    for (const b of bcs) {
      await publish(b.topic, message, b.connection)
    }
  }
}

export default broadcast
