function handler (conn) {
  this.log.debug('connIs%s%s', conn.name, this.print.write('disconnectedL'))
}

const onDisconnect = {
  handler,
  level: 1000
}

export default onDisconnect
