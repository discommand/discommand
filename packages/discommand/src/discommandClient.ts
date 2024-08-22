import type { DiscommandClientOptions } from './types/index.js'
import { DiscommandHandler } from './discommandHandler.js'
import { Client, type ClientOptions } from 'discord.js'

export class DiscommandClient extends Client {
  public commandHandler: DiscommandHandler
  public listenerHandler?: DiscommandHandler

  public constructor(
    clientOptions: ClientOptions,
    public readonly discommandOptions: DiscommandClientOptions,
  ) {
    super(clientOptions)
    this.commandHandler = new DiscommandHandler(this, {
      directory: discommandOptions.directory.command,
      guildID: discommandOptions.guildID,
      loader: discommandOptions.loader,
    })
    if (discommandOptions.directory.listener) {
      this.listenerHandler = new DiscommandHandler(this, {
        directory: discommandOptions.directory.listener,
        loader: discommandOptions.loader,
      })
    }
  }

  public loadAll() {
    void this.commandHandler.loadAll()
    if (this.listenerHandler) {
      void this.listenerHandler.loadAll()
    }
  }

  public deLoadAll() {
    this.commandHandler.deLoadAll()
    if (this.listenerHandler) {
      this.listenerHandler.deLoadAll()
    }
  }

  public reLoadAll() {
    this.commandHandler.reLoadAll()
    if (this.listenerHandler) {
      this.listenerHandler.reLoadAll()
    }
  }

  public async login(token?: string): Promise<string> {
    const login = await super.login(token)
    this.loadAll()
    if (this.discommandOptions.plugins)
      this.discommandOptions.plugins.forEach(plugin => plugin.start(this))
    return login
  }
}
