module.exports = async function (conn) {
  this.bajo.log.debug(`[%s][%s] reconnect`, 'ndutMqtt', conn.name)
}
