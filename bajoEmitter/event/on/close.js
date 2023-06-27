export default {
  handler: function (conn) {
    const { log } = this.bajo.helper
    log.info(`'%s' is closed`, conn.name)
  },
  level: 1000
}