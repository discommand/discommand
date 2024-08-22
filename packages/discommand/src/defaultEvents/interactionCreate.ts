import { type Interaction, Events } from 'discord.js'
import { Listener } from '../listener.js'
import { Command } from '../command.js'

export default class DefaultInteractionCreate extends Listener {
  public constructor() {
    super(Events.InteractionCreate)
  }

  public async execute(interaction: Interaction) {
    const modules = this.handler?.modules
    if (interaction.isChatInputCommand()) {
      const command = modules?.get(interaction.commandName) as
        | Command
        | undefined

      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
      }
    } else if (interaction.isAutocomplete()) {
      const command = modules?.get(interaction.commandName) as
        | Command
        | undefined

      if (!command) return

      try {
        await command.autocompleteExecute(interaction)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
