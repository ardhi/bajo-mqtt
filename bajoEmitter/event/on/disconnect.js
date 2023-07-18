const onDisconnect = {
  handler: function (conn) {
    const { log } = this.bajo.helper
    log.info('\'%s\' is disconnected', conn.name)
  },
  level: 1000
}

export default onDisconnect
