function handler (conn) {
  this.log.debug('connIs%s%s', conn.name, this.print.write('reconnectingL'))
}

const onReconnect = {
  handler,
  level: 1
}

export default onReconnect
