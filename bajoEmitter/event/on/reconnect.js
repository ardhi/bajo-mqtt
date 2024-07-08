const onReconnect = {
  handler: function bajoMqttOnReconnect (conn) {
    this.log.debug('Connection \'%s\' is trying to reconnect', conn.name)
  },
  level: 1
}

export default onReconnect
