function handler (conn, error) {
  this.log.error('connError%s%s', conn.name, error.message)
}

const onError = {
  handler,
  level: 1
}

export default onError
