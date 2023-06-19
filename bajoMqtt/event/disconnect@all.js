export default async function (conn) {
  const { log } = this.bajo.helper
  log.info(`Connection '%s' disconnected`, conn.name)
}
