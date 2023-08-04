const onOffline = {
  handler: function bajoMqttOnOffline (conn) {
    const { log } = this.bajo.helper
    log.debug('\'%s\' is offline', conn.name)
  },
  level: 1000
}

export default onOffline
