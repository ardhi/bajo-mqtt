import mqtt from 'mqtt'

async function start () {
  const { runHook } = this.app.bajo
  const { camelCase } = this.app.bajo.lib._

  for (const c of this.connections ?? []) {
    const client = mqtt.connect(c.url, c.options)
    for (const evt of this.events) {
      client.on(evt, async (...args) => {
        if (this.app.bajoEmitter) this.app.bajoEmitter.emit(`${this.name}.${evt}`, c, ...args)
        await runHook(`${this.name}:${camelCase('on ' + evt)}`, c, ...args)
      })
    }
    c.instance = client
  }
}

export default start
