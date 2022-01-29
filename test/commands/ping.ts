import { Command, CommandHandler } from '../../dist'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends Command {
  data = new SlashCommandBuilder().setName('ping').setDescription('ping')
  execute(interaction: CommandInteraction, cmd: CommandHandler) {
    interaction.reply('Pong!')
  }
}
