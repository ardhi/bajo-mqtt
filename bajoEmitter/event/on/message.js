const onMessage = {
  handler: async function bajoMqttOnMessage (...args) {
    // for broadcast only
    const { broadcast } = this.bajoEmitter.helper
    const [conn, subject, msg] = args
    if (!conn.broadcast) return
    broadcast({ from: `${conn.name}@bajoMqtt`, msg, subject })
  }
}

export default onMessage
