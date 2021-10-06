import { Client, Collection } from 'discord.js'
import { readdirSync } from 'fs'

type loadType = 'FOLDER' | 'FILE'

/**
 *
 * @property {Client} client
 * @property {string} prefix
 * @property {string} path
 * @property {'FOLDER', 'FILE'} loadType
 */
export class Command implements CommandOptions {
  client: Client
  prefix: string
  path: string
  loadType: loadType
  constructor(client: Client, options: CommandOptions) {
    this.client = client
    this.prefix = options.prefix
    this.path = options.path
    this.loadType = options.loadType
  }

  public commands = new Collection()

  public version = require('../../package.json').version

  public loadCommand() {
    if (this.loadType == 'FILE') {
      const commandFiles = readdirSync(this.path)
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${file}`)
        const Command = new command()
        this.commands.set(Command.name, Command)
        console.log(`${Command.name} load`)
      }
    } else if (this.loadType == 'FOLDER') {
      const commandFolders = readdirSync(this.path)

      for (const folder of commandFolders) {
        const commandFiles = readdirSync(`${this.path}/${folder}`)
        for (const file of commandFiles) {
          const { command } = require(`${this.path}/${folder}/${file}`)
          const Command = new command()
          this.commands.set(Command.name, Command)
          console.log(`${Command.name} load`)
        }
      }
    }
  }

  public async run() {
    const prefix = this.prefix
    this.client.on('messageCreate', msg => {
      if (!msg?.content.startsWith(prefix) || msg.author.bot) return

      const args: string[] = msg.content.slice(prefix.length).trim().split(/ +/)
      const shift: any = args.shift()
      const commandName = shift.toLowerCase()

      const command: any =
        this.commands.get(commandName) ||
        this.commands.find(
          (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
        )

      if (!command) return

      try {
        command.execute(msg, this.client, args)
      } catch (error) {
        console.error(error)
      }
      if (!this.commands.has(commandName)) return
    })
  }
}

export interface CommandOptions {
  path: string
  prefix: string
  loadType: loadType
}
