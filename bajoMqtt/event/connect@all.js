module.exports = async function (conn) {
  const { _, getConfig } = this.bajo.helper
  const config = getConfig('bajoMqtt')
  this.bajo.log.debug(`[MQTT][${conn.name}] connected`)
  const client = this.bajoMqtt.client[conn.name]
  // relay
  const relays = _.filter(config.relays || [], r => _.get(r, 'source.connection') === conn.name)
  for (const r of relays) {
    const opts = { topic: _.get(r, 'source.topic'), connection: _.get(r, 'source.connection'), relay: true }
    this.bajoMqtt.helper.subscribe(opts)
  }
  // normal subscriber
  for (const t in this.bajoMqtt.subscribe) {
    const subs = _.filter(this.bajoMqtt.subscribe[t] || [], { connection: conn.name })
    if (subs.length > 0) {
      client.subscribe(t)
      this.bajo.log.debug(`[MQTT][${conn.name}] subscribed to ${t}`)
    }
  }
}
