import { type Client, Collection } from 'discord.js'
import {
  type DiscommandHandlerOptions,
  type ModuleType,
} from './types/index.js'
import { BaseHandler } from './bases/index.js'
import { ModuleLoader } from '@discommand/loader'

export class DiscommandHandler extends BaseHandler {
  public modules: Collection<string, ModuleType> = new Collection()
  public constructor(
    public client: Client,
    public readonly options: DiscommandHandlerOptions,
  ) {
    super(client, options.loader || new ModuleLoader(), options.guildID)
  }

  public loadAll() {
    this.loader
      .loadModule<ModuleType>(this.options.directory) //
      .then(modules => this.load(modules))
  }

  public deloadAll() {
    this.deload(this.loader.deloadModule(this.options.directory))
  }

  public reloadAll() {
    this.reload(this.loader.reloadModule(this.options.directory))
  }
}
