export default {
  handler: function (conn) {
    const { log } = this.bajo.helper
    log.debug(`'%s' is offline`, conn.name)
  },
  level: 1000
}
