import { Events, InteractionType } from 'discord.js'
import { type DiscommandHandler } from '../DiscommandHandler'

export async function interactionCreate(handler: DiscommandHandler) {
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
