const onOffline = {
  handler: function bajoMqttOnOffline (conn) {
    this.log.trace('Connection \'%s\' is offline', conn.name)
  },
  level: 1000
}

export default onOffline
