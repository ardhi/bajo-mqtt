const onEnd = {
  handler: function bajoMqttOnEnd (conn) {
    this.log.trace('Connection \'%s\' is ended', conn.name)
  },
  level: 1000
}

export default onEnd
