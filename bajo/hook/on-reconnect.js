const onReconnect = {
  handler: function bajoMqttOnReconnect (conn) {
    this.log.debug('Connection \'%s\' is %s', conn.name, this.print.write('reconnecting'))
  },
  level: 1
}

export default onReconnect
