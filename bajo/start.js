export default async function () {
  const { _, getConfig, emit } = this.bajo.helper
  const { mqtt, events } = this.bajoMqtt.helper
  const config = getConfig('bajoMqtt')
  const instances = []

  for (const c of config.connections) {
    const client = mqtt.connect(c.url, c.options)
    for (const evt of events) {
      client.on(evt, async (...args) => {
        emit(`bajoMqtt:${evt}`, c, ...args)
      })
    }
    instances.push({ name: c.name, client })
  }
  this.bajoMqtt.instances = instances
}
