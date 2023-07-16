async function subscribe (topic, handler, conn = 'default', now, publish) {
  const { importPkg, log } = this.bajo.helper
  const { cloneDeep, isString, pick, find } = await importPkg('lodash-es::bajo')
  let opts = cloneDeep(topic)
  if (isString(topic)) opts = { topic, handler, connection: conn, bindNow: now, publish }
  this.bajoMqtt.subscribers = this.bajoMqtt.subscribers || []
  if (isString(opts.connection)) opts.connection = opts.connection.split(',')
  for (const c of opts.connection) {
    const o = pick(opts, ['topic', 'handler', 'publish'])
    o.connection = c
    this.bajoMqtt.subscribers.push(o)
    if (now) {
      const instance = find(this.bajoMqtt.instances, { name: c.name })
      if (instance) {
        await instance.client.subscribe(o)
        log.info(`Subscribed to '%s:%s'`, conn.name, o.topic)
      }
    }
  }
}

export default subscribe