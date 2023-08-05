const onMessage = {
  handler: async function bajoMqttOnMessage (...args) {
    // for broadcast only
    const { broadcast } = this.bajoEmitter.helper
    let [conn, topic, msg] = args
    for (const sub of this.bajoMqtt.subscribers) {
      if (!(sub.connection === conn.name && sub.topic === topic)) continue
      for (const b of sub.broadcastPool || []) {
        msg = msg.toString()
        try {
          msg = JSON.parse(msg)
        } catch (err) {}
        broadcast({
          msg,
          to: b,
          from: `${topic}@${conn.name}.bajoMqtt`
        })
      }
    }
  }
}

export default onMessage
