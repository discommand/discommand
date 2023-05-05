import { Client, type ClientOptions } from 'discord.js'
import { DiscommandHandler } from './DiscommandHandler.js'
import type { DiscommandClientOptions } from './types/index.js'

export class DiscommandClient extends Client {
  public commandHandler: DiscommandHandler
  public listenerHandler?: DiscommandHandler
  public constructor(
    clientOptions: ClientOptions,
    public readonly discommandOptions: DiscommandClientOptions
  ) {
    super(clientOptions)
    this.commandHandler = new DiscommandHandler(this, {
      directory: discommandOptions.directory.command,
      guildID: discommandOptions.guildID,
    })
    if (discommandOptions.directory.listener) {
      this.listenerHandler = new DiscommandHandler(this, {
        directory: discommandOptions.directory.listener,
      })
    }
  }

  public loadAll() {
    this.commandHandler.loadAll()
    if (this.listenerHandler) {
      this.listenerHandler.loadAll()
    }
  }

  public deloadAll() {
    this.commandHandler.deloadAll()
    if (this.listenerHandler) {
      this.listenerHandler.deloadAll()
    }
  }

  public reloadAll() {
    this.commandHandler.reloadAll()
    if (this.listenerHandler) {
      this.listenerHandler.reloadAll()
    }
  }

  public async login(token?: string): Promise<string> {
    await this.loadAll()
    this.discommandOptions.plugins.forEach(plugin => plugin.start())
    return super.login(token)
  }
}
