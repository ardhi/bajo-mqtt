module.exports = async function () {
  const { _, getConfig } = this.bajo.helper
  const { mqtt, events } = this.bajoMqtt.helper
  const config = getConfig('bajoMqtt')
  const client = {}

  for (const c of config.connections) {
    const cl = mqtt.connect(c.url, c.options)
    for (const evt of events) {
      cl.on(evt, async (...args) => {
        const evts = _.filter(this.bajoMqtt.event[evt] || [], { connection: c.name })
        if (evts.length > 0) {
          for (const e of evts) {
            await e.handler.call(this, c, ...args)
          }
        }
      })
    }
    client[c.name] = cl
  }
  this.bajoMqtt.client = client
}
