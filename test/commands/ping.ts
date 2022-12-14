import { ChatInputCommandInteraction } from 'discord.js'
import { Command } from '../../dist'

export default class PingCommand extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'pong'
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong!')
  }
}
