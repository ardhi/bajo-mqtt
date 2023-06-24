export default function () {
  const { _ } = this.bajo.helper
  const { async } = this.bajoExtra.helper
  if (this.bajoMqtt.instances.length === 0) return Promise.resolve()
  return new Promise((resolve, reject) => {
    async.each(this.bajoMqtt.instances, (instance, callback) => {
      async.each(this.bajoMqtt.subscribers, (sub, cb) => {
        if (sub.connection === instance.name) instance.client.unsubscribe(sub.topic, cb)
      }, (e) => {
        instance.client.end(callback)
      })
    }, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
