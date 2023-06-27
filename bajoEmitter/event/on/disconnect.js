export default {
  handler: function (conn) {
    const { log } = this.bajo.helper
    log.info(`'%s' is disconnected`, conn.name)
  },
  level: 1000
}