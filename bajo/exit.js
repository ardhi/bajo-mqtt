function exit () {
  const { importPkg } = this.bajo.helper
  if (!this.bajoMqtt.connections) return Promise.resolve()
  if (this.bajoMqtt.connections.length === 0) return Promise.resolve()
  return new Promise((resolve, reject) => {
    if (!this.bajoExtra) return resolve()
    importPkg('bajo-extra:async')
      .then(async => {
        async.each(this.bajoMqtt.connections, (c, callback) => {
          async.each(this.bajoMqtt.subscribers, (sub, cb) => {
            if (sub.connection === c.name) c.instance.unsubscribe(sub.topic)
            cb()
          }, (e) => {
            c.instance.end(true)
            callback()
          })
        }, (e) => {
          resolve()
        })
      })
  })
}

export default exit
