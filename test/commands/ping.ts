import { Command, DiscommandHandler } from '../../dist'
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default class extends Command {
  name = 'ping'
  description = 'pong'
  execute(interaction: CommandInteraction, cmd: DiscommandHandler) {
    interaction.reply('Pong!')
  }
}
