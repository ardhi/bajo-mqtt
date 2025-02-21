function handler (conn) {
  this.log.trace('connIs%s%s', conn.name, this.print.write('endedL'))
}

const onEnd = {
  handler,
  level: 1000
}

export default onEnd
