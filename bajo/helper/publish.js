export default function (topic, message, conn = 'default') {
  const { _, error } = this.bajo.helper
  return new Promise((resolve, reject) => {
    const instance = _.find(this.bajoMqtt.instances, { name: conn })
    if (!instance) throw error(`No such connection '${conn}'`, { code: 'BAJOMQTT_NO_SUCH_CONNECTION' })
    instance.client.publish(topic,
      _.isPlainObject(message) || _.isArray(message) ? JSON.stringify(message) : message,
      err => {
        if (err) reject(err)
        else resolve()
      }
    )
  })
}
