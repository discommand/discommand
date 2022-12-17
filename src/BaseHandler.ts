import { ApplicationCommandType, Client, Collection } from 'discord.js'
import { Command } from './Command'
import { Listener } from './Listener'
import { MessageContextMenu } from './MessageCtx'
import { ModuleType } from './types'
import { UserContextMenu } from './UserCtx'

/**
 * @abstract
 */
export abstract class BaseHandler {
  public readonly client: Client
  public modules: Collection<string, ModuleType> = new Collection()
  /**
   *
   * @param {Client} client
   */
  public constructor(client: Client) {
    this.client = client
  }

  /**
   * @protected
   */
  protected register(modules: ModuleType) {
    if (modules instanceof Command) {
      console.info(`[discommand] Command ${modules.name} is loaded.`)
      this.modules.set(modules.name, modules)
      this.client.once('ready', () => {
        this.client.application?.commands.create({
          name: modules.name,
          nameLocalizations: modules.nameLocalizations,
          description: modules.description,
          descriptionLocalizations: modules.descriptionLocalizations,
          type: ApplicationCommandType.ChatInput,
          options: modules.options,
        })
      })
    } else if (modules instanceof Listener) {
      console.log(`[discommand] Listener ${modules.name} is loaded.`)
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
      console.log(`[discommand] User Context Menu ${modules.name} is loaded.`)
      this.client.application?.commands.create({
        name: modules.name,
        nameLocalizations: modules.nameLocalizations,
        type: ApplicationCommandType.User,
        defaultMemberPermissions: modules.defaultMemberPermissions,
      })
    } else if (modules instanceof MessageContextMenu) {
      console.log(
        `[discommand] Message Context Menu ${modules.name} is loaded.`
      )
      this.client.application?.commands.create({
        name: modules.name,
        nameLocalizations: modules.nameLocalizations,
        type: ApplicationCommandType.Message,
        defaultMemberPermissions: modules.defaultMemberPermissions,
      })
    }
  }

  /**
   * @protected
   */
  protected deregister(module: ModuleType, filedir: string) {
    if (module instanceof Command) {
      this.modules.delete(module.name)
      console.log(`[discommand] Command ${module.name} is deloaded.`)
      delete require.cache[require.resolve(filedir)]
    } else if (module instanceof Listener) {
      this.modules.delete(module.name)
      console.log(`[discommand] Listener ${module.name} is deloaded.`)
      delete require.cache[require.resolve(filedir)]
    }
  }
}
