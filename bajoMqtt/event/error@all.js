module.exports = async function (conn, error) {
  const { log } = this.bajo.helper
  log.error(`Connection '%s' error: %s`, conn.name, error.message)
}
