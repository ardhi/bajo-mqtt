module.exports = async function (conn) {
  const { log } = this.bajo.helper
  log.debug(`Connection '%s' offline`, conn.name)
}
