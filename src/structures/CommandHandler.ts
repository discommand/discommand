import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import { Command } from './Command'
import { Listener, Options } from '..'

/**
 * @typedef Options
 * @param {Client} client
 * @param {string} path
 * @param {'FOLDER', 'FILE'} loadType
 */
export class CommandHandler {
  client: Client
  options: Options
  constructor(client: Client, options: Options) {
    this.client = client
    this.options = options
  }

  public commands = new Collection()

  public version = require('../../package.json').version

  /**
   * @private
   */
  private SlashCommandRegister(file: Command) {
    console.log(`[discommand] Command ${file.data.name} is Loaded.`)
    this.commands.set(file.data.name, file)
    this.client.on('ready', () => {
      // @ts-ignore
      this.client.application!.commands.create(file.data.toJSON())
    })

    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return

      const command: any = this.commands.get(interaction.commandName)

      if (!command) return

      try {
        await command.execute(interaction, this)
      } catch (error) {
        console.error(error)
      }
    })
  }

  public CommandLoadAll() {
    console.log(`[discommand] version: ${this.version}`)
    const Dir = readdirSync(this.options.path)
    if (this.options.loadType === 'FILE') {
      for (const File of Dir) {
        const cmd = require(`${this.options.path}/${File}`)
        const command = new cmd()
        this.SlashCommandRegister(command)
      }
    } else if (this.options.loadType === 'FOLDER') {
      for (const Folder of Dir) {
        const Dir2 = readdirSync(`${this.options.path}/${Folder}`)
        for (const File of Dir2) {
          const cmd = require(`${this.options.path}/${Folder}/${File}`)
          const command = new cmd()
          this.SlashCommandRegister(command)
        }
      }
    }
  }

  public CommandDeloadAll() {
    // @ts-ignore
    const CommandName = this.commands.map((event: Listener) => event.name)
    for (const Command of CommandName) {
      this.commands.delete(Command)
    }
  }

  public CommandReloadAll() {
    this.CommandDeloadAll()
    this.CommandLoadAll()
  }
}
