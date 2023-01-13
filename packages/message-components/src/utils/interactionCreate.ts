import type { ComponentHandler } from '../ComponentHandler'
import { Events, InteractionType } from 'discord.js'

export function interactionCreate(handler: ComponentHandler) {
  handler.client.on(Events.InteractionCreate, async interaction => {
    if (interaction.type === InteractionType.MessageComponent) {
      const module = handler.modules.get(interaction.customId)

      if (!module) return

      await module.execute(interaction)
    }
  })
}
