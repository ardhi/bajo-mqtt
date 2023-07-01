import path from 'path'

async function collectSubscribers ({ file }) {
  const { getPkg, importModule } = this.bajo.helper
  const _ = await getPkg('lodash')

  let [base, conn] = path.basename(file, '.js').split('@')
  base = base.replaceAll(/\-/g, '/') // base = topic
  if (!conn) conn = ['default']
  else conn = conn.split(',')
  let mod = await importModule(file)
  let subs = []
  if (_.isFunction(mod)) mod = mod.length === 0 ? await mod.call(this) : { handler: mod }
  if (_.isPlainObject(mod)) {
    if (!mod.topic) mod.topic = base
    if (!mod.connection) mod.connection = conn
    if (_.isFunction(mod.topic)) mod.topic = await mod.topic.call(this)
    if (mod.topic && mod.connection && mod.handler) subs.push(mod)
  } else if (_.isArray(mod)) subs = mod
  for (const s of subs) {
    await this.bajoMqtt.helper.subscribe(s)
  }
}

export default collectSubscribers
