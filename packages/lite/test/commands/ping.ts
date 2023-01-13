import { Command } from '../../dist'
import { ChatInputCommandInteraction } from 'discord.js'

export default class extends Command {
  public constructor() {
    super()
    this.name = 'ping'
    this.description = 'pong'
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong')
  }
}
