function publish (topic, message, conn = 'default') {
  const { error } = this.bajo.helper
  const { find } = this.bajo.helper._
  return new Promise((resolve, reject) => {
    const c = find(this.bajoMqtt.connections, { name: conn })
    if (!c) throw error('No such connection \'%s\'', conn)
    if (!c.instance.connected) throw error('Connection \'%s\' is dead', conn)
    c.instance.publish(topic, message, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export default publish
