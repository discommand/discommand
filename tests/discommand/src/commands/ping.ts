import {
  ApplicationCommandType,
  type ChatInputCommandInteraction,
} from 'discord.js'
import { Command } from 'discommand'

export default class PingCommand extends Command {
  constructor() {
    super('ping')
    this.data = {
      type: ApplicationCommandType.ChatInput,
      name: 'ping',
      description: 'pong',
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong!')
  }
}
