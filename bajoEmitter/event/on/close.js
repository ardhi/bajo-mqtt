const onClose = {
  handler: function bajoMqttOnClose (conn) {
    const { log } = this.bajo.helper
    log.debug('\'%s\' is closed', conn.name)
  },
  level: 1000
}

export default onClose
