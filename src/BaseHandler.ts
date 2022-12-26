import {
  type Client,
  Collection,
  type Snowflake,
  ApplicationCommandType,
} from 'discord.js'
import { Command } from './Command'
import { Listener } from './Listener'
import { type ModuleType } from './types'

export abstract class BaseHandler {
  public readonly client: Client
  protected guildID?: Snowflake
  public modules: Collection<string, ModuleType> = new Collection()
  /**
   *
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Snowflake} guildID
   */
  public constructor(client: Client, guildID?: Snowflake) {
    this.client = client
    this.guildID = guildID
  }

  protected register(modules: ModuleType) {
    if (modules instanceof Command) {
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create(modules.toJSON(), this.guildID)
      })
    } else if (modules instanceof Listener) {
      this.modules.set(modules.name, modules)
      if (modules.once) {
        this.client.once(modules.name, (...args) => {
          modules.execute(...args)
        })
      } else {
        this.client.on(modules.name, (...args) => {
          modules.execute(...args)
        })
      }
    }
  }

  protected deregister(moduleName: string, filedir: string) {
    this.modules.delete(moduleName)
    delete require.cache[require.resolve(filedir)]
  }

  protected moduleType(module: ModuleType) {
    if (module instanceof Listener) {
      return 'Listener'
    } else {
      switch (module.data!.type) {
        case ApplicationCommandType.ChatInput:
          return 'ChatInputCommand'
        case ApplicationCommandType.User:
          return 'UserContextMenu'
        case ApplicationCommandType.Message:
          return 'MessageContextMenu'
        case undefined:
          return 'ChatInputCommand'
      }
    }
  }

  public load(module: ModuleType[]) {
    module.forEach(module => {
      this.register(module)
      console.log(
        `[discommand] ${this.moduleType(module)} ${module.name} is loaded.`
      )
    })
  }
}
