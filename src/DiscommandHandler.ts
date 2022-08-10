import { Client, Collection, InteractionType } from 'discord.js'
import { Options, LoadType } from '.'
import { readdirSync } from 'fs'
import { Command, Listener } from '.'

export class DiscommandHandler {
  public client: Client
  public options: Options
  public constructor(client: Client, options: Options) {
    this.client = client
    this.options = options
  }

  public modules: Collection<string, Command | Listener> = new Collection()

  /**
   *
   * @private
   */
  private register(modules: Command | Listener) {
    if (modules instanceof Command) {
      console.info(`[discommand] Command ${modules.name} is Loaded.`)
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create({
          name: modules.name,
          description: modules.description,
          // @ts-ignore
          type: modules.type,
          // @ts-ignore
          options: modules.options,
          defaultPermission: modules.defaultPermission,
        })
      })

      this.client.on('interactionCreate', async interaction => {
        if (interaction.type === InteractionType.ApplicationCommand) {
          if (!interaction.isChatInputCommand()) return

          const command = this.modules.get(interaction.commandName) as Command

          if (!command) return

          try {
            await command.execute(interaction, this)
          } catch (error) {
            console.error(error)
          }
        }
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
        const modules = new tempModules()
        this.register(modules)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(`${this.options.directory}/${folder}`)
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder}/${file}`)
          const modules = new tempModules()
          this.register(modules)
        }
      }
    }
  }
}
