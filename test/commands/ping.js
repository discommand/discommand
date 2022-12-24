const { ApplicationCommandType } = require('discord.js')
const { Command } = require('../..')

module.exports = class PingCommand extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'pong'
    this.type = ApplicationCommandType.ChatInput
  }
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
