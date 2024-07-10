async function send ({ msg, from, to } = {}) {
  const { error } = this.app.bajo.helper
  const { find, isEmpty } = this.app.bajo.helper._
  const { addressSplit } = this.app.bajoEmitter.helper
  const { publish } = this.helper
  const { subject, connection, plugin } = addressSplit(to)
  if (plugin !== 'bajoMqtt') return
  if (isEmpty(subject)) return
  const c = find(this.connections, { name: connection })
  if (!c) throw error('No such connection \'%s\'', connection)
  if (!c.instance) return
  if (!c.instance.connected) return
  await publish(subject, msg, connection)
}

export default send
