import { Client, Collection, Message } from 'discord.js'
import { readdirSync } from 'fs'
import { MessageCommand } from '..'
import { SlashCommand } from './SlashCommand'

export type loadType = 'FOLDER' | 'FILE'

/**
 * @typedef CommandOptions
 * @param {Client} client
 * @param {string} prefix
 * @param {string} path
 * @param {'FOLDER', 'FILE'} loadType
 */
export class Command {
  client: Client
  options: CommandOptions
  constructor(client: Client, options: CommandOptions) {
    this.client = client
    this.options = options
  }

  public commands = new Collection()

  public version = require('../../package.json').version

  /**
   * @private
   */
  private SlashCommandRegister(file: SlashCommand) {
    console.log(`[discommand] ${file.data.name} is Loaded.`)
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

  /**
   * @private
   */
  private MessageCommandRegister(file: MessageCommand) {
    console.log(`[discommand] ${file.name} is Loaded.`)
    if (!this.options.prefix)
      throw Error(
        'This is MessageCommand, So you have to define this.options.prefix.'
      )
    this.commands.set(file.name, file)
    this.client.on('messageCreate', msg => {
      if (!msg.content.startsWith(this.options.prefix!) || msg.author.bot)
        return

      const args: string[] = msg.content
        .slice(this.options.prefix!.length)
        .trim()
        .split(/ +/)
      const commandName = args.shift()?.toLowerCase() as string
      const command: any =
        this.commands.get(commandName) ||
        this.commands.find(
          (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
        )

      if (!command) return

      try {
        command.execute(msg, args, this)
      } catch (error) {
        console.error(error)
      }
      if (!this.commands.has(commandName)) return
    })
  }

  public loadCommand() {
    const Dir = readdirSync(this.options.path)
    if (this.options.loadType === 'FILE') {
      for (const File of Dir) {
        const cmd = require(`${this.options.path}/${File}`)
        const command = new cmd()

        if (command instanceof SlashCommand) {
          this.SlashCommandRegister(command)
        } else if (command instanceof MessageCommand) {
          this.MessageCommandRegister(command)
        }
      }
    } else if (this.options.loadType === 'FOLDER') {
      for (const Folder of Dir) {
        const Dir2 = readdirSync(`${this.options.path}/${Folder}`)
        for (const File of Dir2) {
          const cmd = require(`${this.options.path}/${Folder}/${File}`)
          const command = new cmd()

          if (command instanceof SlashCommand) {
            this.SlashCommandRegister(command)
          } else if (command instanceof MessageCommand) {
            this.MessageCommandRegister(command)
          }
        }
      }
    }
  }
}

export interface CommandOptions {
  path: string
  prefix?: string
  loadType: loadType
}
