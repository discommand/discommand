import {
  type Client,
  Collection,
  type Snowflake,
  ApplicationCommandType,
} from 'discord.js'
import { Listener } from '../Listener'
import { DeloadOptions, type ModuleType, ReloadOptions } from '../types'
import { loadModule } from '../utils'

export abstract class BaseHandler {
  public readonly client: Client
  public readonly guildID?: Snowflake
  public readonly modules: Collection<string, ModuleType> = new Collection()
  protected constructor(client: Client, guildID?: Snowflake) {
    this.client = client
    this.guildID = guildID
  }

  protected register(modules: ModuleType) {
    if (modules instanceof Listener) {
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
    } else {
      this.modules.set(modules.toJSON().name, modules)
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

  public deload(options: DeloadOptions[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      console.log(fileDir)
      this.deregister(module.name, fileDir)
      console.log(
        `[discommand] ${this.moduleType(option.module)} ${
          module.name
        } is deloaded.`
      )
    })
  }

  public reload(options: ReloadOptions[]) {
    options.forEach(option => {
      const { module, fileDirs, fileDir } = option
      fileDirs.forEach(file => {
        this.deregister(module.name, file)
      })
      loadModule(fileDir).forEach(module => {
        this.register(module)
      })
      console.log(
        `[discommand] ${this.moduleType(option.module)} ${
          module.name
        } is reloaded.`
      )
    })
  }
}
