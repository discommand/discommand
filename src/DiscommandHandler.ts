import { type Client, Collection, InteractionType } from 'discord.js'
import { type DiscommandHandlerOptions, LoadType, type ModuleType } from '.'
import { readdirSync } from 'fs'
import { Command, Listener } from '.'
import { BaseHandler } from './BaseHandler'

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
  }

  public loadAll() {
    const dir = readdirSync(this.options.directory)

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
        let modules
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }
        this.register(modules)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(`${this.options.directory}/${folder}`)
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder}/${file}`)
          let modules
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }
          this.register(modules)
        }
      }
    }

    this.client.on('interactionCreate', async interaction => {
      if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.isChatInputCommand()) {
          const command = this.modules.get(interaction.commandName)

          if (!command) return

          try {
            await command.execute(interaction)
          } catch (error) {
            console.error(error)
          }
        } else if (interaction.isMessageContextMenuCommand()) {
          const command = this.modules.get(interaction.commandName)

          if (!command) return

          try {
            await command.execute(interaction)
          } catch (error) {
            console.error(error)
          }
        } else if (interaction.isUserContextMenuCommand()) {
          const command = this.modules.get(interaction.commandName)

          if (!command) return

          try {
            await command.execute(interaction)
          } catch (error) {
            console.error(error)
          }
        }
      }
    })
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

        this.deregister(modules, `${this.options.directory}/${file}`)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(`${this.options.directory}/${folder}`)
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder}/${file}`)
          let modules
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }
          this.deregister(modules, `${this.options.directory}/${file}`)
        }
      }
    }
  }

  public reloadAll() {
    this.deloadAll()
    this.loadAll()
  }
}
