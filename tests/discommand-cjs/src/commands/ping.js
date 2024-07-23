const { ApplicationCommandType } = require('discord.js')
const { Command } = require('discommand')

module.exports = class PingCommand extends Command {
  constructor() {
    super({
      type: ApplicationCommandType.ChatInput,
      name: 'ping',
      description: 'pong',
    })
  }
  /**
   *
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
