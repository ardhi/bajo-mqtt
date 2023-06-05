module.exports = async function (conn) {
  this.bajo.log.debug(`[%s][%s] offline`, 'ndutMqtt', conn.name)
}
