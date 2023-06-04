module.exports = async function (conn, error) {
  this.bajo.log.warn(`[MQTT][${conn.name}] Error: ${error.message}`)
}
