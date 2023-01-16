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
  public modules: Collection<string, ModuleType> = new Collection()

  public constructor(
    client: Client,
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

    clientReady(this)
  }

  public deloadAll() {
    this.deload(deloadModule(this.options.directory))
  }

  public reloadAll() {
    this.reload(reloadModule(this.options.directory))
  }
}
