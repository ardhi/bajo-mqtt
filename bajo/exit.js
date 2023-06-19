export default function () {
  const { _ } = this.bajo.helper
  const { async } = this.bajoExtra.helper
  const names = _.keys(this.bajoMqtt.client)
  if (names.length === 0) return Promise.resolve()
  return new Promise((resolve, reject) => {
    async.each(names, (name, callback) => {
      this.bajoMqtt.client[name].end(callback)
    }, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}
