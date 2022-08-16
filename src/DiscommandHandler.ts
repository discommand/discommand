import { Client, Collection, InteractionType } from 'discord.js'
import { DiscommandHandlerOptions, LoadType, ModuleType } from '.'
import { readdirSync } from 'fs'
import { Command, Listener } from '.'

export class DiscommandHandler {
  public client: Client
  public options: DiscommandHandlerOptions
  public constructor(client: Client, options: DiscommandHandlerOptions) {
    this.client = client
    this.options = options
  }

  public modules: Collection<string, ModuleType> = new Collection()

  /**
   *
   * @private
   */
  private register(modules: ModuleType) {
    if (modules instanceof Command) {
      console.info(`[discommand] Command ${modules.data.name} is Loaded.`)
      this.modules.set(modules.data.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create(modules.data!.toJSON())
      })
    } else if (modules instanceof Listener) {
      console.log(`[discommand] Listener ${modules.name} is Loaded.`)
      this.modules.set(modules.name, modules)
      if (modules.once) {
        this.client.once(modules.name, (...args) => {
          // @ts-ignore
          modules.execute(...args)
        })
      } else {
        this.client.on(modules.name, (...args) => {
          // @ts-ignore
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
            await command.execute(interaction, this)
          } catch (error) {
            console.error(error)
          }
        }
      }
    })
  }
}
