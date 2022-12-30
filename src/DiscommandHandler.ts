import { type Client, Collection, InteractionType } from 'discord.js'
import {
  type DiscommandHandlerOptions,
  LoadType,
  type ModuleType,
} from './types'
import { readdirSync } from 'fs'
import { BaseHandler } from './Bases'
import { DiscommandError } from './error'
import { extname } from 'path'
import {
  deloadModule,
  interactionCreate,
  loadModule,
  reloadModule,
} from './utils'

export class DiscommandHandler extends BaseHandler {
  public options: DiscommandHandlerOptions
  public modules: Collection<string, ModuleType> = new Collection()

  public constructor(client: Client, options: DiscommandHandlerOptions) {
    super(client)
    this.options = options
    this.guildID = options.guildID
  }

  public loadAll() {
    let modules: ModuleType
    const dir = readdirSync(this.options.directory, { withFileTypes: true })

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file.name}`)
        console.log(tempModules)
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }

        if (!modules.name)
          throw new DiscommandError(`The name is missing from ${file.name}`)

        console.log(
          `[discommand]${
            this.guildID ? ` guild ${this.guildID}` : ''
          } ${this.moduleType(modules)} ${modules.name} is loaded.`
        )
        this.register(modules)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(
          `${this.options.directory}/${folder.name}`
        )
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder.name}/${file}`)
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }

          if (!modules.name)
            throw new DiscommandError(
              `The name is missing from ${folder.name}/${file}`
            )

          console.log(
            `[discommand] ${this.moduleType(modules)} ${
              modules.name
            } is loaded.`
          )
          this.register(modules)
        }
      }
    } else if (!this.options.loadType) {
      this.load(loadModule(this.options.directory))
    }

    interactionCreate(this)
  }

  public deloadAll() {
    let modules: ModuleType
    const dir = readdirSync(this.options.directory).filter(
      fileName => extname(fileName) === '.js' || extname(fileName) === '.ts'
    )

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file}`)
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
    } else if (!this.options.loadType) {
      this.deload(deloadModule(this.options.directory))
    }
  }

  public reloadAll() {
    if (this.options.loadType) {
      this.deloadAll()
      this.loadAll()
    } else {
      this.reload(reloadModule(this.options.directory))
    }
  }
}
