import { Client, type ClientOptions } from 'eris'
import type { DiscommandClientOptions } from './types.js'
import { DiscommandHandler } from './handler.js'

export class DiscommandClient extends Client {
  public commandHandler: DiscommandHandler
  public listenerHandler?: DiscommandHandler

  public constructor(
    token: string,
    options: ClientOptions,
    public readonly discommandOptions: DiscommandClientOptions,
  ) {
    super(token, options)
    this.commandHandler = new DiscommandHandler(this, {
      directory: discommandOptions.directory.command,
      guildId: discommandOptions.guildId,
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

  public override async connect() {
    this.loadAll()

    if (this.discommandOptions.plugins) {
      for (const plugin of this.discommandOptions.plugins) {
        plugin.start(this)
      }
    }

    return await super.connect()
  }
}
