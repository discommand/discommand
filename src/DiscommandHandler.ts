import { type Client, Collection, InteractionType } from 'discord.js'
import { type DiscommandHandlerOptions, type ModuleType } from './types'
import { BaseHandler } from './Bases'
import {
  clientReady,
  deloadModule,
  interactionCreate,
  loadModule,
  reloadModule,
} from './utils'

export class DiscommandHandler extends BaseHandler {
  public options: DiscommandHandlerOptions
  public modules: Collection<string, ModuleType> = new Collection()

  public constructor(client: Client, options: DiscommandHandlerOptions) {
    super(client, options.guildID)
    this.options = options
  }

  public loadAll() {
    this.load(loadModule(this.options.directory))

    clientReady(this)
    interactionCreate(this)
  }

  public deloadAll() {
    this.deload(deloadModule(this.options.directory))
  }

  public reloadAll() {
    this.reload(reloadModule(this.options.directory))
  }
}
