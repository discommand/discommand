import { Events, InteractionType } from 'discord.js'
import { type BaseHandler } from '../Bases'

export async function interactionCreate(handler: BaseHandler) {
  handler.client.on(Events.InteractionCreate, async interaction => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = handler.modules.get(interaction.commandName)

      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
      }
    }
  })
}
