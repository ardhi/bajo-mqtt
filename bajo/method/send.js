async function send ({ msg, from, to } = {}) {
  const { error } = this.app.bajo
  const { find, isEmpty } = this.app.bajo.lib._
  const { addressSplit } = this.app.bajoEmitter
  const { subject, connection, plugin } = addressSplit(to)
  if (plugin !== 'bajoMqtt') return
  if (isEmpty(subject)) return
  const c = find(this.connections, { name: connection })
  if (!c) throw error('No such connection \'%s\'', connection)
  if (!c.instance) return
  if (!c.instance.connected) return
  await this.publish(subject, msg, connection)
}

export default send
