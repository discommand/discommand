import { DiscommandHandler } from '../DiscommandHandler'
import { Events } from 'discord.js'
import { Command } from '../Command'

export function clientReady(handler: DiscommandHandler) {
  handler.client.once(Events.ClientReady, () => {
    handler.modules.forEach(module => {
      if (module instanceof Command) {
        handler.client.application!.commands.create(
          module.toJSON(),
          handler.options.guildID
        )
      }
    })
  })
}
