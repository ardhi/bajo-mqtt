module.exports = async function (conn) {
  this.bajo.log.info(`[%s][%s] disconnected`, 'ndutMqtt', conn.name)
}
