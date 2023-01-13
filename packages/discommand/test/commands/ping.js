const { ApplicationCommandType } = require('discord.js')
const { Command } = require('../..')

module.exports = class PingCommand extends Command {
  constructor() {
    super('ping')
    /**
     * @type {import('discord.js').ApplicationCommandData}
     */
    this.data = {
      type: ApplicationCommandType.ChatInput,
      name: 'ping',
      description: 'pong',
    }
  }
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
