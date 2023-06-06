module.exports = async function (conn) {
  this.bajo.log.info(`[%s][%s] disconnected`, 'bajoMqtt', conn.name)
}
