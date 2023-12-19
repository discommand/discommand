import { Events } from 'discord.js'
import { ModuleType } from '../types/index.js'
import type { BaseHandler } from '../Bases/index.js'
import { Listener } from '../listener.js'

export async function clientReady(handler: BaseHandler, modules: ModuleType[]) {
  handler.client.once(Events.ClientReady, async () => {
    for (const module of modules) {
      if (module instanceof Listener) {
        return
      }

      await handler.client.application!.commands.create(
        module.toJSON(),
        module.guildID || handler.guildID
      )
    }
  })
}
