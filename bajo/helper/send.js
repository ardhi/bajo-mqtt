async function send ({ msg, from, to } = {}) {
  const { error } = this.bajo.helper
  const { find } = this.bajo.helper._
  const { addressSplit } = this.bajoEmitter.helper
  const { publish } = this.bajoMqtt.helper
  const { destination, connection, transport } = addressSplit(to)
  if (transport !== 'bajoMqtt') return
  const c = find(this.bajoMqtt.connections, { name: connection })
  if (!c) throw error('No such connection \'%s\'', connection)
  if (!c.instance) return
  if (!c.instance.connected) return
  await publish(destination, msg, connection)
}

export default send
