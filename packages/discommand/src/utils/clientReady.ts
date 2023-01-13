import { Events } from 'discord.js'
import { Command } from '../Command'
import { type BaseHandler } from '../Bases'

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
