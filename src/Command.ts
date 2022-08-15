import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js'
import { type DiscommandHandler } from '.'

export abstract class Command {
  data: SlashCommandBuilder = new SlashCommandBuilder()
  execute(
    interaction: ChatInputCommandInteraction,
    cmd: DiscommandHandler
  ): void {}
}
