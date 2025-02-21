function handler (conn) {
  this.log.trace('connIs%s%s', conn.name, this.print.write('closedL'))
}

const onClose = {
  handler,
  level: 1000
}

export default onClose
