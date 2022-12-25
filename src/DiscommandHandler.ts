import { Client, Collection } from 'discord.js'
import { Options } from './types/Options'
import { readdirSync } from 'fs'
import { Command, Listener } from '.'

export class DiscommandHandler {
  client: Client
  options: Options
  public constructor(client: Client, options: Options) {
    this.client = client
    this.options = options
  }

  public modules = new Collection()

  /**
   *
   * @private
   */
  private Register(modules: Command | Listener) {
    if (modules instanceof Command) {
      console.info(`[Command] ${modules.name} is Loaded.`)
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create({
          name: modules.name,
          description: modules.description,
          // @ts-ignore
          type: modules.type,
          options: modules.options,
          defaultPermission: modules.defaultPermission,
        })
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
    const Dir = readdirSync(this.options.directory)

    if (this.options.loadType === 'FILE') {
      for (const File of Dir) {
        const Temp = require(`${this.options.directory}/${File}`)
        const modules = new Temp()
        this.Register(modules)
      }
    } else if (this.options.loadType === 'FOLDER') {
      for (const Folder of Dir) {
        const Dir2 = readdirSync(`${this.options.directory}/${Folder}`)
        for (const File of Dir2) {
          const Temp = require(`${this.options.directory}/${Folder}/${File}`)
          const modules = new Temp()
          this.Register(modules)
        }
      }
    }

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return

      const command: any = this.modules.get(interaction.commandName)

      if (!command) return

      try {
        await command.execute(interaction, this)
      } catch (error) {
        console.error(error)
      }
    })
  }
}
