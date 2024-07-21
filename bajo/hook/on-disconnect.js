const onDisconnect = {
  handler: function bajoMqttOnDisconnect (conn) {
    this.log.debug('Connection \'%s\' is %s', conn.name, this.print.write('disconnected'))
  },
  level: 1000
}

export default onDisconnect
