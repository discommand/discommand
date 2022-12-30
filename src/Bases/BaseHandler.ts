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
  protected guildID?: Snowflake
  public modules: Collection<string, ModuleType> = new Collection()
  protected constructor(client: Client, guildID?: Snowflake) {
    this.client = client
    this.guildID = guildID
  }

  protected register(modules: ModuleType) {
    this.modules.set(modules.name, modules)
    if (modules instanceof Listener) {
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

  public deload(modules: DeloadOptions[]) {
    modules.forEach(module => {
      const { modules, fileDir } = module
      console.log(fileDir)
      this.deregister(modules.name, fileDir)
      console.log(
        `[discommand] ${this.moduleType(module.modules)} ${
          modules.name
        } is deloaded.`
      )
    })
  }

  public reload(modules: ReloadOptions[]) {
    modules.forEach(module => {
      const { modules, fileDirs, fileDir } = module
      fileDirs.forEach(file => {
        this.deregister(modules.name, file)
      })
      loadModule(fileDir).forEach(module => {
        this.register(module)
      })
      console.log(
        `[discommand] ${this.moduleType(module.modules)} ${
          modules.name
        } is reloaded.`
      )
    })
  }
}
