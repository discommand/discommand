import { CommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { slashCommand } from '../../../dist'

export class command extends slashCommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
  async execute(interaction: CommandInteraction, client: Client) {
    await interaction.reply('pong!')
  }
}
