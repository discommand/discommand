import { Client, ClientOptions } from 'discord.js'
import { DiscommandHandler } from '.'
import { DiscommandClientOptions } from './types/DiscommandClientOptions'

export class DiscommandClient extends Client {
  DiscommandClientOptions: DiscommandClientOptions
  CommandHandler: DiscommandHandler
  ListenerHandler?: DiscommandHandler
  constructor(
    options: ClientOptions,
    DiscommandClientOptions: DiscommandClientOptions
  ) {
    super(options)
    this.DiscommandClientOptions = DiscommandClientOptions
    this.CommandHandler = new DiscommandHandler(this, {
      loadType: DiscommandClientOptions.loadType,
      directory: DiscommandClientOptions.CommandHandlerDirectory,
    })
    if (DiscommandClientOptions.ListenerDirectory) {
      this.ListenerHandler = new DiscommandHandler(this, {
        loadType: DiscommandClientOptions.loadType,
        directory: DiscommandClientOptions.ListenerDirectory,
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
