import {
  type BaseModuleLoader,
  DeloadOptions,
  ModuleLoader,
  ReloadOptions,
} from '@discommand/loader'
import {
  type Snowflake,
  type Client,
  ApplicationCommandType,
  Collection,
  Events,
} from 'discord.js'
import {
  type DiscommandHandlerOptions,
  type ModuleType,
} from './types/index.js'
import DefaultInteractionCreate from './defaultEvents/interactionCreate.js'
import { Listener } from './listener.js'

export class DiscommandHandler {
  public readonly modules: Collection<string, ModuleType> = new Collection()
  public readonly loader: BaseModuleLoader
  public readonly guildID?: Snowflake
  public constructor(
    public client: Client,
    public readonly options: DiscommandHandlerOptions,
  ) {
    this.guildID = options.guildID
    this.loader = options.loader || new ModuleLoader()
    this._register(new DefaultInteractionCreate())
  }

  private _register(modules: ModuleType) {
    modules.client = this.client
    modules.handler = this
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

  private _deregister(moduleName: string, fileDir?: string) {
    this.modules.delete(moduleName)
    if (fileDir) delete require.cache[require.resolve(fileDir)]
  }

  private _moduleType(module: ModuleType) {
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

  public async load(modules: ModuleType[]) {
    for (const module of modules) {
      if (module instanceof Listener) {
        this._register(module)
        console.log(
          `[discommand]${
            this.guildID ? ` guild ${this.guildID}` : ''
          } ${this._moduleType(module)} ${module.name} is loaded.`,
        )
      }
    }

    this.client.once(Events.ClientReady, async () => {
      for (const module of modules) {
        if (module instanceof Listener) {
          return
        }

        this._register(module)
        console.log(
          `[discommand]${
            this.guildID ? ` guild ${this.guildID}` : ''
          } ${this._moduleType(module)} ${module.name} is loaded.`,
        )

        await this.client.application!.commands.create(
          module.toJSON(),
          module.guildID || this.guildID,
        )
      }
    })
  }
  public deLoad(options: DeloadOptions<ModuleType>[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this._deregister(module.name, fileDir)
      console.log(
        `[discommand] ${this._moduleType(option.module)} ${
          module.name
        } is deLoaded.`,
      )
    })
  }

  public reLoad(options: ReloadOptions<ModuleType>[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this._deregister(module.name, fileDir)
      this.loader
        .loadModule<ModuleType>(fileDir)
        .then(modules => modules.forEach(module => this._register(module)))
      console.log(
        `[discommand] ${this._moduleType(option.module)} ${
          module.name
        } is reLoaded.`,
      )
    })
  }

  public async loadAll() {
    const modules = await this.loader.loadModule<ModuleType>(
      this.options.directory,
    )
    void this.load(modules)
  }

  public deLoadAll() {
    this.deLoad(this.loader.deloadModule(this.options.directory))
  }

  public reLoadAll() {
    this.reLoad(this.loader.reloadModule(this.options.directory))
  }
}
