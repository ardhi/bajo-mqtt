function exit () {
  const { importPkg } = this.bajo.helper
  if (!this.bajoMqtt.instances) return Promise.resolve()
  if (this.bajoMqtt.instances.length === 0) return Promise.resolve()
  return new Promise((resolve, reject) => {
    importPkg('bajo-extra:async')
      .then(async => {
        async.each(this.bajoMqtt.instances, (instance, callback) => {
          async.each(this.bajoMqtt.subscribers, (sub, cb) => {
            if (sub.connection === instance.name) instance.client.unsubscribe(sub.topic)
            cb()
          }, (e) => {
            instance.client.end(true)
            callback()
          })
        }, (e) => {
          resolve()
        })
      })
  })
}

export default exit
