import {
  type Client,
  Collection,
  type Snowflake,
  ApplicationCommandType,
} from 'discord.js'
import { Command } from '../Command'
import { Listener } from '../Listener'
import { deloadOptions, type ModuleType } from '../types'

export abstract class BaseHandler {
  public readonly client: Client
  protected guildID?: Snowflake
  public modules: Collection<string, ModuleType> = new Collection()
  protected constructor(client: Client, guildID?: Snowflake) {
    this.client = client
    this.guildID = guildID
  }

  protected register(modules: ModuleType) {
    if (modules instanceof Command) {
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create(modules.toJSON(), this.guildID)
      })
    } else {
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

  protected deregister(moduleName: string, fileDir?: string) {
    this.modules.delete(moduleName)
    if (fileDir) delete require.cache[require.resolve(fileDir)]
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

  public load(modules: ModuleType[]) {
    modules.forEach(module => {
      this.register(module)
      console.log(
        `[discommand]${
          this.guildID ? ` guild ${this.guildID}` : ''
        } ${this.moduleType(module)} ${module.name} is loaded.`
      )
    })
  }

  public deload(modules: deloadOptions[]) {
    modules.forEach(module => {
      const modules = module.modules
      this.deregister(modules.name, module.fileDir!)
      console.log(
        `[discommand] ${this.moduleType(module.modules)} ${
          modules.name
        } is deloaded.`
      )
    })
  }
}
