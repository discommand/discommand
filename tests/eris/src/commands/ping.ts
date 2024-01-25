import { Command } from '@discommand/eris'
import { type CommandInteraction } from 'eris'

export default class extends Command {
  public constructor() {
    super({
      name: 'ping',
      description: 'ping',
    })
  }

  execute(interaction: CommandInteraction) {
    interaction.createMessage('asdf')
  }
}
