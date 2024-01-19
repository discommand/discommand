import {
  type Client,
  type Snowflake,
  Collection,
  ApplicationCommandType,
  Events,
} from 'discord.js'
import { Listener } from '../listener.js'
import type { ModuleType } from '../types/index.js'
import {
  ModuleLoader,
  type DeloadOptions,
  type ReloadOptions,
} from '@discommand/loader'
import type { Command } from '../command.js'

export abstract class BaseHandler {
  public readonly modules: Collection<string, ModuleType> = new Collection()

  protected constructor(
    public readonly client: Client,
    public readonly guildID?: Snowflake,
  ) {
    this.client.on(Events.InteractionCreate, async interaction => {
      if (interaction.isChatInputCommand()) {
        const command = this.modules.get(interaction.commandName) as
          | Command
          | undefined

        if (!command) return

        try {
          await command.execute(interaction)
        } catch (error) {
          console.error(error)
        }
      } else if (interaction.isAutocomplete()) {
        const command = this.modules.get(interaction.commandName) as
          | Command
          | undefined

        if (!command) return

        try {
          await command.autocompleteExecute(interaction)
        } catch (error) {
          console.error(error)
        }
      }
    })
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

  public async load(modules: ModuleType[]) {
    for (const module of modules) {
      if (module instanceof Listener) {
        this.register(module)
        console.log(
          `[discommand]${
            this.guildID ? ` guild ${this.guildID}` : ''
          } ${this.moduleType(module)} ${module.name} is loaded.`,
        )
      }
    }

    this.client.once(Events.ClientReady, async () => {
      for (const module of modules) {
        if (module instanceof Listener) {
          return
        }

        this.register(module)
        console.log(
          `[discommand]${
            this.guildID ? ` guild ${this.guildID}` : ''
          } ${this.moduleType(module)} ${module.name} is loaded.`,
        )

        await this.client.application!.commands.create(
          module.toJSON(),
          module.guildID || this.guildID,
        )
      }
    })
  }

  public deload(options: DeloadOptions<ModuleType>[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this.deregister(module.name, fileDir)
      console.log(
        `[discommand] ${this.moduleType(option.module)} ${
          module.name
        } is deloaded.`,
      )
    })
  }

  public reload(options: ReloadOptions<ModuleType>[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this.deregister(module.name, fileDir)
      new ModuleLoader()
        .loadModule<ModuleType>(fileDir)
        .then(modules => modules.forEach(module => this.register(module)))
      console.log(
        `[discommand] ${this.moduleType(option.module)} ${
          module.name
        } is reloaded.`,
      )
    })
  }
}
