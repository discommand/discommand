import {
  ApplicationCommandType,
  type Client,
  Collection,
  type Snowflake,
  InteractionType,
} from 'discord.js'
import { Command } from './Command'
import { Listener } from './Listener'
import { MessageContextMenu } from './MessageCtx'
import { type ModuleType } from './types'
import { UserContextMenu } from './UserCtx'

/**
 * @abstract
 */
export abstract class BaseHandler {
  public readonly client: Client
  protected guildID?: Snowflake
  public modules: Collection<string, ModuleType> = new Collection()
  /**
   *
   * @param {Client} client
   */
  public constructor(client: Client, guildID?: Snowflake) {
    this.client = client
    this.guildID = guildID
  }

  /**
   * @protected
   */
  protected register(modules: ModuleType) {
    if (modules instanceof Command) {
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create(
          {
            name: modules.name,
            nameLocalizations: modules.nameLocalizations,
            description: modules.description,
            descriptionLocalizations: modules.descriptionLocalizations,
            type: ApplicationCommandType.ChatInput,
            options: modules.options,
          },
          this.guildID
        )
      })
    } else if (modules instanceof Listener) {
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
    } else if (modules instanceof UserContextMenu) {
      this.client.application?.commands.create(
        {
          name: modules.name,
          nameLocalizations: modules.nameLocalizations,
          type: ApplicationCommandType.User,
          defaultMemberPermissions: modules.defaultMemberPermissions,
        },
        this.guildID
      )
    } else if (modules instanceof MessageContextMenu) {
      this.client.application?.commands.create(
        {
          name: modules.name,
          nameLocalizations: modules.nameLocalizations,
          type: ApplicationCommandType.Message,
          defaultMemberPermissions: modules.defaultMemberPermissions,
        },
        this.guildID
      )
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
        } else if (interaction.isContextMenuCommand()) {
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
   * @protected
   */
  protected deregister(moduleName: string, filedir: string) {
    this.modules.delete(moduleName)
    delete require.cache[require.resolve(filedir)]
  }
}
