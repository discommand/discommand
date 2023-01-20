import { Events } from 'discord.js'
import { Command } from '../Command.js'
import type { BaseHandler } from '../Bases/index.js'

export function clientReady(handler: BaseHandler) {
  handler.client.once(Events.ClientReady, () => {
    handler.modules.forEach(module => {
      if (module instanceof Command) {
        handler.client.application!.commands.create(
          module.toJSON(),
          handler.guildID
        )
      }
    })
  })
}
