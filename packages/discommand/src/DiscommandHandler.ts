import { type Client, Collection, InteractionType } from 'discord.js'
import {
  type DiscommandHandlerOptions,
  type ModuleType,
} from './types/index.js'
import { BaseHandler } from './Bases/index.js'
import {
  deloadModule,
  interactionCreate,
  loadModule,
  reloadModule,
} from './utils/index.js'

export class DiscommandHandler extends BaseHandler {
  public modules: Collection<string, ModuleType> = new Collection()
  public constructor(
    public client: Client,
    public readonly options: DiscommandHandlerOptions
  ) {
    super(client, options.guildID)
    client.on('ready', async () => {
      await interactionCreate(this)
    })
  }

  public loadAll() {
    loadModule(this.options.directory) //
      .then(modules => this.load(modules))
  }

  public deloadAll() {
    this.deload(deloadModule(this.options.directory))
  }

  public reloadAll() {
    this.reload(reloadModule(this.options.directory))
  }
}
