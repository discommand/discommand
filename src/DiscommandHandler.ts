import { type Client, Collection } from 'discord.js'
import { type DiscommandHandlerOptions, LoadType, type ModuleType } from '.'
import { readdirSync } from 'fs'
import { BaseHandler } from './BaseHandler'
import { DiscommandError } from './DiscommandError'

/**
 * @typedef {object} DiscommandHandlerOptions
 * @property {LoadType} [loadType]
 * @property {string} [directory]
 */

export class DiscommandHandler extends BaseHandler {
  public options: DiscommandHandlerOptions
  public modules: Collection<string, ModuleType> = new Collection()
  /**
   *
   * @param {Client} [client]
   * @param {DiscommandHandlerOptions} [options]
   */
  public constructor(client: Client, options: DiscommandHandlerOptions) {
    super(client)
    this.options = options
    this.guildID = options.guildID
  }

  public loadAll() {
    const dir = readdirSync(this.options.directory)

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
        let modules: ModuleType
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }

        if (!modules.name)
          throw new DiscommandError(`The name is missing from ${file}`)

        if (
          modules.type === 'MessageContextMenu' ||
          modules.type === 'UserContextMenu'
        )
          console.log('[discommand] You are Using experimental features.')

        console.log(
          `[discommand]${this.guildID ? ` guild ${this.guildID}` : ''} ${
            modules.type
          } ${modules.name} is loaded.`
        )
        this.register(modules)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(`${this.options.directory}/${folder}`)
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder}/${file}`)
          let modules: ModuleType
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }

          if (!modules.name)
            throw new DiscommandError(
              `The name is missing from ${folder}/${file}`
            )
          if (
            modules.type === 'MessageContextMenu' ||
            modules.type === 'UserContextMenu'
          )
            console.log('[discommand] You are Using experimental features.')

          console.log(`[discommand] ${modules.type} ${modules.name} is loaded.`)
          this.register(modules)
        }
      }
    }
  }

  public deloadAll() {
    const dir = readdirSync(this.options.directory)

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
        let modules: ModuleType
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }

        console.log(`[discommand] ${modules.type} ${modules.name} is deloaded.`)
        this.deregister(modules.name, `${this.options.directory}/${file}`)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(`${this.options.directory}/${folder}`)
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder}/${file}`)
          let modules: ModuleType
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }

          console.log(
            `[discommand] ${modules.type} ${modules.name} is deloaded.`
          )
          this.deregister(modules.name, `${this.options.directory}/${file}`)
        }
      }
    }
  }

  public reloadAll() {
    this.deloadAll()
    this.loadAll()
  }
}
