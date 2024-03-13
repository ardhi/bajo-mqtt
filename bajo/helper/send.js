async function send ({ msg, from, to } = {}) {
  const { importPkg, error } = this.bajo.helper
  const { find } = await importPkg('lodash-es')
  const { addressSplit } = this.bajoEmitter.helper
  const { publish } = this.bajoMqtt.helper
  const { destination, connection, transport } = addressSplit(to)
  if (transport !== 'bajoMqtt') return
  const c = find(this.bajoMqtt.connections, { name: connection })
  if (!c) throw error('No such connection \'%s\'', connection)
  if (!c.instance.connected) throw error('Connection \'%s\' is dead', connection)
  await publish(destination, msg, connection)
}

export default send
