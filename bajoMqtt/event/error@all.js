module.exports = async function (conn, error) {
  this.bajo.log.warn(`[%s][%s] Error: %s`, 'bajoMqtt', conn.name, error.message)
}
