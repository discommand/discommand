import { Command } from 'discommand'
import { type ChatInputCommandInteraction } from 'discord.js'

export default class DeloadCommands extends Command {
  constructor() {
    super({
      name: 'deload',
      description: 'deload',
    })
  }
  execute(interaction: ChatInputCommandInteraction) {
    interaction.client.deLoadAll()
  }
}
