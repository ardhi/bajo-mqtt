const onOffline = {
  handler: function bajoMqttOnOffline (conn) {
    this.log.trace('Connection \'%s\' is %s', conn.name, this.print.write('offline'))
  },
  level: 1000
}

export default onOffline
