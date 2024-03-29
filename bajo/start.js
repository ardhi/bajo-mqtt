import mqtt from 'mqtt'

async function start () {
  const { events } = this.bajoMqtt.helper
  const { emit } = this.bajoEmitter.helper
  for (const c of this.bajoMqtt.connections ?? []) {
    const client = mqtt.connect(c.url, c.options)
    for (const evt of events) {
      client.on(evt, async (...args) => {
        emit(`bajoMqtt.${evt}`, c, ...args)
      })
    }
    c.instance = client
  }
}

export default start
