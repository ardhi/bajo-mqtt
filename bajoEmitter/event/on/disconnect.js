const onDisconnect = {
  handler: function bajoMqttOnDisconnect (conn) {
    this.log.debug('Connection \'%s\' is disconnected', conn.name)
  },
  level: 1000
}

export default onDisconnect
