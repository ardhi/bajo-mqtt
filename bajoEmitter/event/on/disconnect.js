const onDisconnect = {
  handler: function bajoMqttOnDisconnect (conn) {
    const { log } = this.bajo.helper
    log.debug('\'%s\' is disconnected', conn.name)
  },
  level: 1000
}

export default onDisconnect
