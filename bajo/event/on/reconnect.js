export default {
  handler: function (conn) {
    const { log } = this.bajo.helper
    log.debug(`'%s' is trying to reconnect`, conn.name)
  },
  level: 1
}
