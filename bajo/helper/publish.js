function publish (topic, message, conn = 'default') {
  const { importPkg, error } = this.bajo.helper
  return new Promise((resolve, reject) => {
    importPkg('lodash-es').then(({ find, isPlainObject, isArray }) => {
      const instance = find(this.bajoMqtt.instances, { name: conn })
      if (!instance) throw error('No such connection \'%s\'', conn, { code: 'BAJOMQTT_NO_SUCH_CONNECTION' })
      if (!instance.client.connected) throw error('Connection \'%s\' is dead', conn, { code: 'BAJOMQTT_CONNECTION_IS_DEAD' })
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

export default publish
