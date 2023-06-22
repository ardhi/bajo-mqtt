export default async function () {
  const { _, getConfig, emit } = this.bajo.helper
  const { mqtt, events } = this.bajoMqtt.helper
  const config = getConfig('bajoMqtt')
  const client = {}

  for (const c of config.connections) {
    const cl = mqtt.connect(c.url, c.options)
    for (const evt of events) {
      cl.on(evt, async (...args) => {
        emit(`bajoMqtt:${evt}`, c, ...args)
      })
    }
    client[c.name] = cl
  }
  this.bajoMqtt.client = client
}
