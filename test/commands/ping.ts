import { Command, DiscommandHandler } from '../../dist'
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default class extends Command {
  data = new SlashCommandBuilder().setName('ping').setDescription('pong')
  execute(interaction: CommandInteraction, cmd: DiscommandHandler) {
    interaction.reply('Pong!')
  }
}
