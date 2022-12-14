import { Client, type ClientOptions } from 'discord.js'
import { DiscommandHandler } from '.'
import { type DiscommandClientOptions } from '.'
import { type LoadType } from './types'

/**
 * @typedef {object} DiscommandClientOptions
 * @property {LoadType} [loadType]
 * @property {{commandFolderDirectory: string; listenerFolderDirectory?: string}} [directory]
 */

export class DiscommandClient extends Client {
  public Options: DiscommandClientOptions
  public CommandHandler: DiscommandHandler
  public ListenerHandler?: DiscommandHandler
  /**
   *
   * @param {ClientOptions} ClientOptions
   * @param {DiscommandClientOptions} options
   */
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

  public deloadAll() {
    this.CommandHandler.deloadAll()
    if (this.ListenerHandler) {
      this.ListenerHandler.deloadAll()
    }
  }

  public reloadAll() {
    this.CommandHandler.reloadAll()
    if (this.ListenerHandler) {
      this.ListenerHandler.reloadAll()
    }
  }
}
