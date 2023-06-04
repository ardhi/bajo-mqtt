module.exports = function (topic, message, conn = 'default') {
  const { _, error } = this.bajo.helper
  return new Promise((resolve, reject) => {
    const client = this.bajoMqtt.client[conn]
    if (!client) throw error(`[MQTT] no such connection '${conn}'`, { code: 'BAJOMQTT_NO_SUCH_CONNECTION' })
    client.publish(topic,
      _.isPlainObject(message) || _.isArray(message) ? JSON.stringify(message) : message,
      err => {
        if (err) reject(err)
        else resolve()
      }
    )
  })
}
