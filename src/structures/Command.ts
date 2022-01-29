import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandHandler } from '..'

export class Command {
  data: SlashCommandBuilder = new SlashCommandBuilder()
  execute(interaction: CommandInteraction, cmd: CommandHandler): any {}
}
