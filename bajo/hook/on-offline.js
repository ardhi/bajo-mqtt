function handler (conn) {
  this.log.trace('connIs%s%s', conn.name, this.print.write('offlineL'))
}

const onOffline = {
  handler,
  level: 1000
}

export default onOffline
