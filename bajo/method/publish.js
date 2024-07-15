function publish (topic, message, conn = 'default') {
  const { find } = this.app.bajo.lib._
  return new Promise((resolve, reject) => {
    const c = find(this.connections, { name: conn })
    if (!c) throw this.error('No such connection \'%s\'', conn)
    if (!c.instance.connected) throw this.error('Connection \'%s\' is dead', conn)
    c.instance.publish(topic, message, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export default publish
