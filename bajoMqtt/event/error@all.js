module.exports = async function (conn, error) {
  this.bajo.log.warn(`[%s][%s] Error: %s`, 'ndutMqtt', conn.name, error.message)
}
