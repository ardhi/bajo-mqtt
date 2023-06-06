module.exports = async function (conn) {
  this.bajo.log.debug(`[%s][%s] offline`, 'bajoMqtt', conn.name)
}
