const mqttEvents = ['connect', 'reconnect', 'close', 'disconnect', 'offline', 'error', 'end',
  'message', 'packetsend', 'packetreceive']

module.exports = async function () {
  const { _, getConfig } = this.bajo.helper
  const { mqtt } = this.bajoMqtt.helper
  const config = getConfig('bajoMqtt')
  const client = {}

  for (const c of config.connections) {
    if (!c.options.clientId) c.options.clientId = this.bajoExtra.helper.generateId()
    const cl = mqtt.connect(c.url, c.options)
    for (const evt of mqttEvents) {
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
