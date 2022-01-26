import { SlashCommand, Command } from '../../../dist/index'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('test').setDescription('test')
  execute(interaction: CommandInteraction, slash: Command) {
    interaction.reply('Pong!')
  }
}
