export default function (topic, message, conn = 'default') {
  const { importPkg, error } = this.bajo.helper
  return new Promise((resolve, reject) => {
    importPkg('lodash-es::bajo').then(({ find, isPlainObject, isArray}) => {
      const instance = find(this.bajoMqtt.instances, { name: conn })
      if (!instance) throw error(`No such connection '${conn}'`, { code: 'BAJOMQTT_NO_SUCH_CONNECTION' })
      if (!instance.client.connected) throw error(`Connection '${conn}' is dead`, { code: 'BAJOMQTT_CONNECTION_IS_DEAD' })
      instance.client.publish(topic,
        isPlainObject(message) || isArray(message) ? JSON.stringify(message) : message,
        err => {
          if (err) reject(err)
          else resolve()
        }
      )
    })
  })
}
