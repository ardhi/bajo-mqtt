import mqtt from 'mqtt'

async function start () {
  const { emit } = this.app.bajoEmitter
  for (const c of this.connections ?? []) {
    const client = mqtt.connect(c.url, c.options)
    for (const evt of this.events) {
      client.on(evt, async (...args) => {
        emit(`bajoMqtt.${evt}`, c, ...args)
      })
    }
    c.instance = client
  }
}

export default start
