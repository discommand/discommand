const { Command } = require('../../dist')

module.exports = class PingCommand extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'pong'
  }
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
