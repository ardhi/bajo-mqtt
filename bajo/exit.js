function exit () {
  const { importPkg } = this.app.bajo.helper
  if (!this.connections) return Promise.resolve()
  if (this.connections.length === 0) return Promise.resolve()
  return new Promise((resolve, reject) => {
    if (!this.app.bajoExtra) return resolve()
    importPkg('bajoExtra:async')
      .then(async => {
        async.each(this.connections, (c, callback) => {
          async.each(this.subscriptions, (sub, cb) => {
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
