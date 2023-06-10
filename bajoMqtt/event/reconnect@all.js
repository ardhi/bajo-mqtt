module.exports = async function (conn) {
  const { log } = this.bajo.helper
  log.debug(`Connection '%s' trying to reconnect`, conn.name)
}
