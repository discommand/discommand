import { Command } from 'discommand'
import { type ChatInputCommandInteraction } from 'discord.js'

export default class DeloadCommands extends Command {
  constructor() {
    super('deload')
    this.data = {
      name: 'deload',
      description: 'deload',
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.client.deloadAll()
  }
}
