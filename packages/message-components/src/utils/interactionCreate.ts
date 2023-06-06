import type { ComponentPlugin } from '../ComponentPlugin.js'
import { Client, Events, InteractionType } from 'discord.js'
import { ComponentHandler } from '../ComponentHandler.js'

export function interactionCreate(
  plugin: ComponentPlugin | ComponentHandler,
  client: Client
) {
  client.on(Events.InteractionCreate, async interaction => {
    if (interaction.type === InteractionType.MessageComponent) {
      const module = plugin.modules.get(interaction.customId)

      if (!module) return

      await module.execute(interaction)
    }
  })
}
