import {
  type Client,
  Collection,
  type Snowflake,
  ApplicationCommandType,
} from 'discord.js'
import { Listener } from '../Listener.js'
import {
  DeloadOptions,
  type ModuleType,
  ReloadOptions,
} from '../types/index.js'
import { clientReady, loadModule } from '../utils/index.js'
import { Command } from '../Command.js'

export abstract class BaseHandler {
  public readonly modules: Collection<string, ModuleType> = new Collection()
  protected constructor(
    public readonly client: Client,
    public readonly guildID?: Snowflake
  ) {
    this.client = client
    this.guildID = guildID
  }

  private register(modules: ModuleType) {
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

  private deregister(moduleName: string, fileDir?: string) {
    this.modules.delete(moduleName)
    if (fileDir) delete require.cache[require.resolve(fileDir)]
  }

  private moduleType(module: ModuleType) {
    if (module instanceof Listener) {
      return 'Listener'
    } else {
      switch (module.data.type) {
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
      if (module instanceof Command) clientReady(this, module)
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
      const { module, fileDir } = option
      this.deregister(module.name, fileDir)
      loadModule(fileDir) //
        .then(modules => modules.forEach(module => this.register(module)))
      console.log(
        `[discommand] ${this.moduleType(option.module)} ${
          module.name
        } is reloaded.`
      )
    })
  }
}
