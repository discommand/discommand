import { Client, type ClientOptions } from 'discord.js'
import { DiscommandHandler } from './DiscommandHandler'
import { type DiscommandClientOptions } from './types'

export class DiscommandClient extends Client {
  public discommandOptions: DiscommandClientOptions
  public commandHandler: DiscommandHandler
  public listenerHandler?: DiscommandHandler
  public constructor(
    ClientOptions: ClientOptions,
    options: DiscommandClientOptions
  ) {
    super(ClientOptions)
    this.discommandOptions = options
    this.commandHandler = new DiscommandHandler(this, {
      loadType: options.loadType,
      directory: options.directory.command,
      guildID: options.guildID,
    })
    if (options.directory.listener) {
      this.listenerHandler = new DiscommandHandler(this, {
        loadType: options.loadType,
        directory: options.directory.listener,
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

  public start(token?: string) {
    this.login(token)
    this.loadAll()
  }
}
