module.exports = async function (conn) {
  this.bajo.log.debug(`[%s][%s] closed`, 'ndutMqtt', conn.name)
}
