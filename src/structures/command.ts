import { Client, Collection, Interaction, Message } from 'discord.js'
import { readdirSync } from 'fs'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

type loadType = 'FOLDER' | 'FILE'
type slashType = 'GUILD' | 'GLOBAL'

export class Command implements CommandOptions {
  /**
   * @property {Client} [client] Discord.js Client
   * @property {string} [prefix] bot's prefix
   * @property {string} [path] commndFile's path
   * @property {'FOLDER' | 'FILE'} [loadType] command load type
   * @property {boolean} [slash] slash on/off
   * @property {'GUILD' | 'GLOBAL'} [slashType] slash type ("GUILD", "GLOBAL") [optional]
   * @property {string} [token] bot's token [optional]
   * @property {string} [guildId] guild's ID [optional]
   */
  client: Client
  prefix: string
  path: string
  loadType: loadType
  slash: boolean
  slashType?: slashType
  token?: string
  guildId?: string
  clientId!: string
  constructor(client: Client, options: CommandOptions) {
    this.client = client
    this.prefix = options.prefix
    this.path = options.path
    this.loadType = options.loadType
    this.slash = options.slash
    this.slashType = options.slashType
    this.token = options.token
    this.guildId = options.guildId
  }

  public commands = new Collection()

  public version = require('../../package.json').version

  public loadCommand() {
    if (this.slash == false) {
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
    } else if (this.slash == true) {
      if (this.slashType == undefined) throw new Error('slashType is required.')

      if (this.token == undefined) throw new Error('Token is required.')
      if (this.slashType == 'GUILD') {
        if (this.guildId == undefined) throw new Error('guildId is required.')
        if (this.loadType == 'FILE') {
          const commandFiles = readdirSync(this.path)

          for (const file of commandFiles) {
            const { command } = require(`${this.path}/${file}`)
            const Command = new command()
            this.commands.set(Command.data.name, Command)
            console.log(`${Command.data.name} load`)
          }

          const rest = new REST({ version: '9' }).setToken(`${this.token}`)
          const commands: any[] = []

          for (const file of commandFiles) {
            const { command } = require(`${this.path}/${file}`)
            const Command = new command()
            commands.push(Command.data.toJSON())
          }
          this.client.once('ready', async () => {
            this.clientId = await this.client
              .application!.fetch()
              .then(data => data!.id)
            ;(async () => {
              try {
                await rest.put(
                  Routes.applicationGuildCommands(
                    this.clientId as string,
                    this.guildId as string
                  ),
                  {
                    body: commands,
                  }
                )
              } catch (error) {
                console.error(error)
              }
            })()
          })
        } else if (this.loadType == 'FOLDER') {
          const commandFolders = readdirSync(this.path)

          for (const folder of commandFolders) {
            const commandFiles = readdirSync(`${this.path}/${folder}`)
            for (const file of commandFiles) {
              const { command } = require(`${this.path}/${folder}/${file}`)
              const Command = new command()
              this.commands.set(Command.data.name, Command)
              console.log(`${Command.data.name} load`)
            }
          }

          const rest = new REST({ version: '9' }).setToken(`${this.token}`)
          const commands: any[] = []

          for (const folder of commandFolders) {
            const commandFiles = readdirSync(`${this.path}/${folder}`)
            for (const file of commandFiles) {
              const { command } = require(`${this.path}/${folder}/${file}`)
              const Command = new command()
              commands.push(Command.data.toJSON())
            }
          }
          this.client.once('ready', async () => {
            this.clientId = await this.client
              .application!.fetch()
              .then(data => data!.id)
            ;(async () => {
              try {
                await rest.put(
                  Routes.applicationGuildCommands(
                    this.clientId as string,
                    this.guildId as string
                  ),
                  {
                    body: commands,
                  }
                )
              } catch (error) {
                console.error(error)
              }
            })()
          })
        }
      } else if (this.slashType == 'GLOBAL') {
        if (this.loadType == 'FILE') {
          const commandFiles = readdirSync(this.path)

          for (const file of commandFiles) {
            const { command } = require(`${this.path}/${file}`)
            const Command = new command()
            this.commands.set(Command.data.name, Command)
            console.log(`${Command.data.name} load`)
          }

          const rest = new REST({ version: '9' }).setToken(`${this.token}`)
          const commands: any[] = []

          for (const file of commandFiles) {
            const { command } = require(`${this.path}/${file}`)
            const Command = new command()
            commands.push(Command.data.toJSON())
          }

          this.client.once('ready', async () => {
            this.clientId = await this.client
              .application!.fetch()
              .then(data => data!.id)
            ;(async () => {
              try {
                await rest.put(Routes.applicationCommands(this.clientId), {
                  body: commands,
                })
              } catch (error) {
                console.error(error)
              }
            })()
          })
        }
      } else if (this.loadType == 'FOLDER') {
        const commandFolders = readdirSync(this.path)

        for (const folder of commandFolders) {
          const commandFiles = readdirSync(`${this.path}/${folder}`)
          for (const file of commandFiles) {
            const { command } = require(`${this.path}/${folder}/${file}`)
            const Command = new command()
            this.commands.set(Command.data.name, Command)
            console.log(`${Command.data.name} load`)
          }
        }

        const rest = new REST({ version: '9' }).setToken(`${this.token}`)
        const commands: any[] = []

        for (const folder of commandFolders) {
          const commandFiles = readdirSync(`${this.path}/${folder}`)
          for (const file of commandFiles) {
            const { command } = require(`${this.path}/${folder}/${file}`)
            const Command = new command()
            commands.push(Command.data.toJSON())
          }
        }
        this.client.once('ready', async () => {
          this.clientId = await this.client
            .application!.fetch()
            .then(data => data!.id)
          ;(async () => {
            try {
              await rest.put(
                Routes.applicationCommands(this.clientId as string),
                {
                  body: commands,
                }
              )
            } catch (error) {
              console.error(error)
            }
          })()
        })
      }
    }
  }

  public async run() {
    this.client.on('interactionCreate', async interaction => {
      if (this.slash == true) {
        if (!interaction?.isCommand()) return

        const command: any = this.commands.get(interaction.commandName)

        if (!command) return

        try {
          await command.execute(interaction, this.client)
        } catch (error) {
          console.error(error)
        }
      }
    })
    if (this.slash == false) {
      const prefix = this.prefix
      this.client.on('messageCreate', msg => {
        if (!msg?.content.startsWith(prefix) || msg.author.bot) return

        const args: string[] = msg.content
          .slice(prefix.length)
          .trim()
          .split(/ +/)
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
}

interface CommandOptions {
  path: string
  prefix: string
  loadType: loadType
  slash: boolean
  slashType?: slashType
  token?: string
  guildId?: string
}
