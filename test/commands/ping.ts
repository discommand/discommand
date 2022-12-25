import { Command } from '../../dist'
import { CommandInteraction } from 'discord.js'

// @ts-ignore
export = class extends Command {
  name = 'ping'
  description = 'ping'
  execute(interaction: CommandInteraction) {
    interaction.reply('Pong!')
  }
}
