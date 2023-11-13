import { Events, InteractionType } from 'discord.js'
import type { BaseHandler } from '../Bases/index.js'
import { type Command } from '../command.js'

export async function interactionCreate(handler: BaseHandler) {
  handler.client.on(Events.InteractionCreate, async interaction => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = handler.modules.get(interaction.commandName) as
        | Command
        | undefined

      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
      }
    } else if (interaction.isAutocomplete()) {
      const command = handler.modules.get(interaction.commandName) as
        | Command
        | undefined

      if (!command) return

      try {
        await command.autocompleteExecute(interaction)
      } catch (error) {
        console.error(error)
      }
    }
  })
}
