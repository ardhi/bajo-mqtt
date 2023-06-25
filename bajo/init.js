import collectSubscribers from '../lib/collect-subscribers.js'

async function connBuilder (c, config) {
  const { _, error } = this.bajo.helper
  if (_.isString(c)) c = { url: c }
  if (!_.has(c, 'url')) throw error('Connection must have url', { code: 'BAJOMQTT_CONNECTION_MISSING_MISSING' })
  if (!_.has(c, 'name')) {
    if (_.find(config.connections, { name: 'default' })) throw error('Connection \'default\' already exists', { code: 'BAJOMQTT_CONNECTION_ALREADY_EXISTS' })
    else c.name = 'default'
  }
  c.options = c.options || {}
  if (!c.options.clientId) c.options.clientId = this.bajoExtra.helper.generateId()
}

function prepBroadcasts () {
  const { _, getConfig, error } = this.bajo.helper
  const opts = getConfig('bajoMqtt')
  let bcs = opts.broadcasts || []
  if (_.isPlainObject(bcs)) bcs = [bcs]
  for (const b of bcs) {
    if (!b.name) throw error('A broadcaster must have a name', { code: 'BAJOMQTT_BROADCASTER_NAME_MISSING' })
    if (!b.connection) throw error('A broadcaster must be bound to a connection', { code: 'BAJOMQTT_BROADCASTER_CONNECTION_MISSING' })
    if (!_.map(opts.connections, 'name').includes(b.connection)) throw error(`Unknown connection for broadcaster '${b.name}'`, { code: 'BAJOMQTT_BROADCASTER_CONNECTION_UNKNOWN' })
    if (!b.topic) throw error('A broadcaster must have topic to send to', { code: 'BAJOMQTT_BROADCASTER_TOPIC_MISSING' })
    if (!b.tags) throw error('A broadcaster must have one or more tags', { code: 'BAJOMQTT_BROADCASTER_TAG_MISSING' })
    if (_.isString(b.tags)) b.tags = [b.tags]
  }
}

async function init () {
  const { walkBajos, buildConnections } = this.bajo.helper
  await buildConnections('bajoMqtt', connBuilder, ['name'])
  prepBroadcasts.call(this)
  await walkBajos(collectSubscribers, { glob: 'subscriber/*.js' })
}

export default init
