const onClose = {
  handler: function bajoMqttOnClose (conn) {
    this.log.trace('Connection \'%s\' is closed', conn.name)
  },
  level: 1000
}

export default onClose
