import { Client, ClientOptions } from 'discord.js'
import { DiscommandHandler } from '.'
import { DiscommandClientOptions } from '.'

export class DiscommandClient extends Client {
  Options: DiscommandClientOptions
  CommandHandler: DiscommandHandler
  ListenerHandler?: DiscommandHandler
  constructor(ClientOptions: ClientOptions, options: DiscommandClientOptions) {
    super(ClientOptions)
    this.Options = options
    this.CommandHandler = new DiscommandHandler(this, {
      loadType: options.loadType,
      directory: this.Options.directory.commandFolderDirectory,
    })
    if (options.directory.listenerFolderDirectory) {
      this.ListenerHandler = new DiscommandHandler(this, {
        loadType: options.loadType,
        directory: options.directory.listenerFolderDirectory,
      })
    }
  }

  public loadAll() {
    this.CommandHandler.loadAll()
    if (this.ListenerHandler) {
      this.ListenerHandler.loadAll()
    }
  }
}
