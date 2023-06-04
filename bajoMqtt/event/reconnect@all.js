module.exports = async function (conn) {
  this.bajo.log.debug(`[MQTT][${conn.name}] reconnected`)
}
