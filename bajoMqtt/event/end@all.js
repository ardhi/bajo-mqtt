module.exports = async function (conn) {
  this.bajo.log.debug(`[%s][%s] ended`, 'bajoMqtt', conn.name)
}
