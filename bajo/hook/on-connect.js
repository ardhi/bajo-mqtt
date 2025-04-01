function handler (conn) {
  const { find } = this.lib._
  this.log.debug('connIs%s%s', conn.name, this.print.write('connectedL'))
  const c = find(this.connections, { name: conn.name })
  if (!c) return
  for (const s of this.subscriptions) {
    if (s.connection !== conn.name) continue
    c.instance.subscribe(s.topic)
    this.log.debug('subscribedTo%s%s', conn.name, s.topic)
  }
}

const onConnect = {
  handler,
  level: 1
}

export default onConnect
