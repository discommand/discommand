import { Command } from '../../dist'
import { CommandInteraction } from 'discord.js'

export = class extends Command {
  name = 'ping'
  description = 'ping'
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong!')
  }
}
