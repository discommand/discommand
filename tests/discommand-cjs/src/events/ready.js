const { Listener } = require('discommand')
const { ActivityType } = require('discord.js')

module.exports = class extends Listener {
  constructor() {
    super('ready')
  }
  /**
   *
   * @param {import('discord.js').Client} client
   */
  execute(client) {
    console.log(`Login as ${client.user.tag}`)
    client.user.setActivity('asdf', { type: ActivityType.Playing })
  }
}
