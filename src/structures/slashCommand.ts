import { CommandInteraction, Client } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

interface commandOptions {
  data: SlashCommandBuilder
}

export class slashCommand implements commandOptions {
  data: SlashCommandBuilder = new SlashCommandBuilder()
  execute(interaction: CommandInteraction, client: Client): any {}
}
