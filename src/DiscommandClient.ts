import { Client, type ClientOptions } from 'discord.js'
import { DiscommandHandler } from '.'
import { type DiscommandClientOptions } from '.'

/**
 * @typedef {object} LoadType
 * @property {number} [File]
 * @property {number} [Folder]
 */

/**
 * @typedef {object} directory
 * @property {string} [command]
 * @property {string | undefined} [listener]
 */

/**
 * @typedef {object} DiscommandClientOptions
 * @property {LoadType} [loadType]
 * @property {directory} [directory]
 * @property {import('discord.js').Snowflake} [guildID]
 */

export class DiscommandClient extends Client {
  public discommandOptions: DiscommandClientOptions
  public commandHandler: DiscommandHandler
  public listenerHandler?: DiscommandHandler
  /**
   *
   * @param {import('discord.js').ClientOptions} [ClientOptions]
   * @param {DiscommandClientOptions} [options]
   */
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
