const onEnd = {
  handler: function bajoMqttOnEnd (conn) {
    this.log.trace('Connection \'%s\' is %s', conn.name, this.print.write('ended'))
  },
  level: 1000
}

export default onEnd
