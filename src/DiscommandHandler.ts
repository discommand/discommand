import { type Client, Collection, InteractionType } from 'discord.js'
import { type DiscommandHandlerOptions, LoadType, type ModuleType } from '.'
import { readdirSync } from 'fs'
import { Command, Listener } from '.'

/**
 * @typedef {object} DiscommandHandlerOptions
 * @property {LoadType} [loadType]
 * @property {string} [directory]
 */

export class DiscommandHandler {
  public client: Client
  public options: DiscommandHandlerOptions
  public modules: Collection<string, ModuleType> = new Collection()
  /**
   *
   * @param {Client} [client]
   * @param {DiscommandHandlerOptions} [options]
   */
  public constructor(client: Client, options: DiscommandHandlerOptions) {
    this.client = client
    this.options = options
  }

  /**
   *
   * @private
   */
  private register(modules: ModuleType) {
    if (modules instanceof Command) {
      console.info(`[discommand] Command ${modules.name} is Loaded.`)
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create({
          name: modules.name,
          nameLocalizations: modules.nameLocalizations,
          description: modules.description,
          descriptionLocalizations: modules.descriptionLocalizations,
          defaultPermission: modules.defaultPermission,
          // @ts-ignore
          type: modules.type!,
          options: modules.options,
        })
      })
    } else if (modules instanceof Listener) {
      console.log(`[discommand] Listener ${modules.name} is loaded.`)
      this.modules.set(modules.name, modules)
      if (modules.once) {
        this.client.once(modules.name, (...args) => {
          modules.execute(...args)
        })
      } else {
        this.client.on(modules.name, (...args) => {
          modules.execute(...args)
        })
      }
    }
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
        }
      }
    })
  }

  /**
   * @private
   */
  private deregister(module: ModuleType, filedir: string) {
    if (module instanceof Command) {
      this.modules.delete(module.name)
      console.log(`[discommand] Command ${module.name} is deloaded.`)
      delete require.cache[require.resolve(filedir)]
    } else {
      this.modules.delete(module.name)
      console.log(`[discommand] Listener ${module.name} is deloaded.`)
      delete require.cache[require.resolve(filedir)]
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
