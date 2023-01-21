import { type Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { type Command, LoadType, type Options } from '.'

export class CommandHandler {
  public modules: Collection<string, Command> = new Collection()
  public constructor(
    public readonly client: Client,
    public readonly options: Options
  ) {
    if (!options.loadType)
      readdirSync(options.directory, { withFileTypes: true }).forEach(a => {
        if (a.isFile()) options.loadType = LoadType.File
        else if (a.isDirectory()) options.loadType = LoadType.Folder
      })
  }

  private register(modules: Command) {
    const data = modules.toJSON()
    console.info(`[discommand-lite] ${data.name} is Loaded.`)
    this.modules.set(data.name, modules)
    this.client.once('ready', () => {
      this.client.application?.commands.create(data)
    })
  }

  private deregister(module: Command, fileDir: string) {
    const data = module.toJSON()
    this.modules.delete(data.name)
    console.log(`[discommand-lite] ${data.name} is deloaded.`)
    delete require.cache[require.resolve(fileDir)]
  }

  public deloadAll() {
    const dir = readdirSync(this.options.directory)

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
        let modules: Command
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
          let modules: Command
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
          let modules: Command
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
      if (interaction.isChatInputCommand()) {
        const command = this.modules.get(interaction.commandName)

        if (!command) return

        await command.execute(interaction)
      }
    })
  }

  public reloadAll() {
    this.deloadAll()
    this.loadAll()
  }
}
