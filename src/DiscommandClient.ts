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
  public discommandOptions: DiscommandClientOptions
  public commandHandler: DiscommandHandler
  public listenerHandler?: DiscommandHandler
  /**
   *
   * @param {ClientOptions} ClientOptions
   * @param {DiscommandClientOptions} options
   */
  public constructor(
    ClientOptions: ClientOptions,
    options: DiscommandClientOptions
  ) {
    super(ClientOptions)
    this.discommandOptions = options
    this.commandHandler = new DiscommandHandler(this, {
      loadType: options.loadType,
      directory: this.discommandOptions.directory.commandFolderDirectory,
    })
    if (options.directory.listenerFolderDirectory) {
      this.listenerHandler = new DiscommandHandler(this, {
        loadType: options.loadType,
        directory: options.directory.listenerFolderDirectory,
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
}
