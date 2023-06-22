export default {
  handler: function (conn, error) {
    const { log } = this.bajo.helper
    log.error(`'%s' error: %s`, conn.name, error.message)
  },
  level: 1
}