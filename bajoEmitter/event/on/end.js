const onEnd = {
  handler: function bajoMqttOnEnd (conn) {
    const { log } = this.bajo.helper
    log.debug('\'%s\' is ended', conn.name)
  },
  level: 1000
}

export default onEnd
