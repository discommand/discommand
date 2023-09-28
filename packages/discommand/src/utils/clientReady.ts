import { Events } from 'discord.js'
import { Command } from '../command.js'
import type { BaseHandler } from '../Bases/index.js'

export function clientReady(handler: BaseHandler, command: Command) {
  handler.client.once(Events.ClientReady, () => {
    handler.client.application!.commands.create(
      command.toJSON(),
      command.guildID || handler.guildID
    )
  })
}
