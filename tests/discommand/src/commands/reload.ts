import { type ChatInputCommandInteraction } from 'discord.js'
import { Command } from 'discommand'

export default class DeloadCommands extends Command {
  constructor() {
    super('reload')
    this.data = {
      name: 'reload',
      description: 'reload',
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.client.reloadAll()
  }
}
