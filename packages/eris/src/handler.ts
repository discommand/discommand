import {
  type AutocompleteInteraction,
  type Client,
  type CommandInteraction,
  Constants,
} from 'eris'
import type { DiscommandHandlerOptions, ModuleType } from './types.js'
import {
  type BaseModuleLoader,
  type DeloadOptions,
  ModuleLoader,
} from '@discommand/loader'
import { Listener } from './listener.js'
import { Command } from './command.js'

interface InteractionData {
  type: 1 | 2 | 3
  name: string
  id: string
}

export class DiscommandHandler {
  public modules: Map<string, ModuleType> = new Map()
  public loader: BaseModuleLoader

  public constructor(
    public readonly client: Client,
    public readonly options: DiscommandHandlerOptions,
  ) {
    this.loader = options.loader || new ModuleLoader()

    this.client.on('interactionCreate', async interaction => {
      if (interaction.type === Constants.InteractionTypes.APPLICATION_COMMAND) {
        const command = this.modules.get(
          (interaction.data as InteractionData | undefined)!.name!,
        ) as Command | undefined

        if (!command) {
          return
        }

        try {
          await command.execute(interaction as CommandInteraction)
        } catch (err) {
          console.error(err)
        }
      } else if (
        interaction.type ===
        Constants.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE
      ) {
        const command = this.modules.get(
          (interaction.data as InteractionData | undefined)!.name!,
        ) as Command | undefined

        if (!command) {
          return
        }

        try {
          await command.autocompleteExecute(
            interaction as AutocompleteInteraction,
          )
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  private async _create(module: Command, guildId?: string) {
    if (guildId) {
      await this.client.requestHandler.request(
        'POST',
        `/applications/${this.client.application!.id}/guilds/${guildId}/commands`,
        true,
        { ...module.toJSON() },
      )
      this._log('load', module, guildId)
    } else {
      await this.client.requestHandler.request(
        'POST',
        `/applications/${this.client.application!.id}/commands`,
        true,
        { ...module.toJSON() },
      )
      this._log('load', module)
    }
  }

  private _register(module: ModuleType) {
    this.modules.set(module.name, module)

    if (module instanceof Listener) {
      if (module.once) {
        this.client.once(module.name, (...args) => {
          module.execute(...args)
        })
      } else {
        this.client.on(module.name, (...args) => {
          module.execute(...args)
        })
      }
    }
  }

  private _deregister(moduleName: string) {
    this.modules.delete(moduleName)
  }

  private _moduleType(module: ModuleType) {
    if (module instanceof Listener) {
      return 'Listener'
    } else {
      switch (module.data.type) {
        case 1:
          return 'ChatInputCommand'
        case 2:
          return 'UserContextMenu'
        case 3:
          return 'MessageContextMenu'
        case undefined:
          return 'ChatInputCommand'
      }
    }
  }

  private _log(type: 'load' | 'deload', module: ModuleType, guildId?: string) {
    switch (type) {
      case 'load':
        if (guildId) {
          console.log(
            `[discommand] guild ${guildId} ${this._moduleType(module)} ${module.name} loaded.`,
          )
        } else {
          console.log(
            `[discommand] ${this._moduleType(module)} ${module.name} loaded.`,
          )
        }
        break
      case 'deload':
        if (guildId) {
          console.log(
            `[discommand] guild ${guildId} ${this._moduleType(module)} ${module.name} deloaded.`,
          )
        } else {
          console.log(
            `[discommand] ${this._moduleType(module)} ${module.name} deloaded.`,
          )
        }
    }
  }

  public async load(modules: ModuleType[]) {
    for (const module of modules) {
      if (module instanceof Listener) {
        this._register(module)
        this._log('load', module)
      }
    }

    this.client.once('ready', () => {
      for (const module of modules) {
        if (module instanceof Listener) {
          return
        }

        this._register(module)
        this._create(
          module,
          module.guildId || this.options.guildId || undefined,
        )
      }
    })
  }

  public deload(options: DeloadOptions<ModuleType>[]) {
    for (const option of options) {
      this._deregister(option.module.name)
      this._log('deload', option.module)
    }
  }

  public loadAll() {
    this.loader
      .loadModule<ModuleType>(this.options.directory)
      .then(modules => this.load(modules))
  }

  public deloadAll() {
    this.deload(this.loader.deloadModule(this.options.directory))
  }
}
