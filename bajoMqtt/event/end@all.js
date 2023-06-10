module.exports = async function (conn) {
  const { log } = this.bajo.helper
  log.debug(`Connection '%s' ended`, conn.name)
}
