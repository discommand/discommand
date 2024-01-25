import { type Client } from 'eris'
import type { DiscommandHandlerOptions, ModuleType } from './types.js'
import {
  type BaseModuleLoader,
  type DeloadOptions,
  ModuleLoader,
} from '@discommand/loader'
import { Listener } from './listener.js'
import { Command } from './command.js'

export class DiscommandHandler {
  public modules: Map<string, ModuleType> = new Map()
  public loader: BaseModuleLoader

  public constructor(
    public readonly client: Client,
    public readonly options: DiscommandHandlerOptions,
  ) {
    this.loader = options.loader || new ModuleLoader()
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
      this._register(module)
      if (module instanceof Command) {
        if (module.guildId) {
          await this.client.requestHandler.request(
            'POST',
            `/applications/${this.client.application!.id}/guilds/${module.guildId}/commands`,
            true,
            { ...module.toJSON() },
          )
          this._log('load', module, module.guildId)
        } else if (this.options.guildId) {
          await this.client.requestHandler.request(
            'POST',
            `/applications/${this.client.application!.id}/guilds/${this.options.guildId}/commands`,
            true,
            { ...module.toJSON() },
          )
          this._log('load', module, this.options.guildId)
        } else {
          await this.client.requestHandler.request(
            'POST',
            `/applications/${this.client.application!.id}/commands`,
            true,
            { ...module.toJSON() },
          )
          this._log('load', module)
        }
      } else {
        this._log('load', module)
      }
    }
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
