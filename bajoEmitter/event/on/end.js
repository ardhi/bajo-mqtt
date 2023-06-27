export default {
  handler: function (conn) {
    const { log } = this.bajo.helper
    log.debug(`'%s' is ended`, conn.name)
  },
  level: 1000
}