function publish (topic, message, conn = 'default') {
  const { importPkg, error } = this.bajo.helper
  return new Promise((resolve, reject) => {
    importPkg('lodash-es').then(({ find, isPlainObject, isArray }) => {
      const c = find(this.bajoMqtt.connections, { name: conn })
      if (!c) throw error('No such connection \'%s\'', conn)
      if (!c.instance.connected) throw error('Connection \'%s\' is dead', conn)
      c.instance.publish(topic,
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
