const onClose = {
  handler: function bajoMqttOnClose (conn) {
    this.log.trace('Connection \'%s\' is %s', conn.name, this.print.write('closed'))
  },
  level: 1000
}

export default onClose
