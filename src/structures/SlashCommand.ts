import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '..'

export class SlashCommand {
  data: SlashCommandBuilder = new SlashCommandBuilder()
  execute(interaction: CommandInteraction, cmd: Command): any {}
}
