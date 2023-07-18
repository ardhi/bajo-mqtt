import path from 'path'

async function collectSubscribers ({ file }) {
  const { importPkg, importModule } = this.bajo.helper
  const { isFunction, isPlainObject, isArray } = await importPkg('lodash-es')

  let [base, conn] = path.basename(file, '.js').split('@')
  base = base.replaceAll(/-/g, '/') // base = topic
  if (!conn) conn = ['default']
  else conn = conn.split(',')
  let mod = await importModule(file)
  let subs = []
  if (isFunction(mod)) mod = mod.length === 0 ? await mod.call(this) : { handler: mod }
  if (isPlainObject(mod)) {
    if (!mod.topic) mod.topic = base
    if (!mod.connection) mod.connection = conn
    if (isFunction(mod.topic)) mod.topic = await mod.topic.call(this)
    if (mod.topic && mod.connection && mod.handler) subs.push(mod)
  } else if (isArray(mod)) subs = mod
  for (const s of subs) {
    await this.bajoMqtt.helper.subscribe(s)
  }
}

export default collectSubscribers
