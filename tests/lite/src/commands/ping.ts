import { Command } from '@discommand/lite'
import { ChatInputCommandInteraction } from 'discord.js'

export default class extends Command {
  constructor() {
    super()
    this.data = {
      name: 'ping',
      description: 'pong',
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong!')
  }
}
