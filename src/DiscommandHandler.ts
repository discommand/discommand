import { type Client, Collection, InteractionType } from 'discord.js'
import { type DiscommandHandlerOptions, LoadType, type ModuleType } from '.'
import { readdirSync } from 'fs'
import { BaseHandler } from './BaseHandler'
import { DiscommandError } from './DiscommandError'
import { extname } from 'path'

/**
 * @typedef {object} LoadType
 * @property {number} [File]
 * @property {number} [Folder]
 */

/**
 * @typedef {object} DiscommandHandlerOptions
 * @property {LoadType} [loadType]
 * @property {string} [directory]
 * @property {import('discord.js').Snowflake} [guildID]
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
    const dir = readdirSync(this.options.directory).filter(
      fileName => extname(fileName) === '.js' || extname(fileName) === '.ts'
    )

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

        console.log(
          `[discommand]${
            this.guildID ? ` guild ${this.guildID}` : ''
          } ${this.moduleType(modules)} ${modules.name} is loaded.`
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

          console.log(
            `[discommand] ${this.moduleType(modules)} ${
              modules.name
            } is loaded.`
          )
          this.register(modules)
        }
      }
    }

    this.client.on('interactionCreate', async interaction => {
      if (interaction.type === InteractionType.ApplicationCommand) {
        const command = this.modules.get(interaction.commandName)

        if (!command) return

        try {
          await command.execute(interaction)
        } catch (error) {
          console.error(error)
        }
      }
    })
  }

  public deloadAll() {
    const dir = readdirSync(this.options.directory).filter(
      fileName => extname(fileName) === '.js' || extname(fileName) === '.ts'
    )

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
        let modules: ModuleType
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }

        console.log(
          `[discommand] ${this.moduleType(modules)} ${
            modules.name
          } is deloaded.`
        )
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
            `[discommand] ${this.moduleType(modules)} ${
              modules.name
            } is deloaded.`
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
