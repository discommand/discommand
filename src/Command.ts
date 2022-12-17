import {
  type ApplicationCommandOptionData,
  type ApplicationCommandType,
  type ChatInputCommandInteraction,
  type LocalizationMap,
  type PermissionResolvable,
} from 'discord.js'
import { Base } from './Base'

/**
 * @abstract
 */
export abstract class Command extends Base {
  public nameLocalizations?: LocalizationMap
  public description: string = ''
  public descriptionLocalizations?: LocalizationMap
  public type?: ApplicationCommandType
  public options?: ApplicationCommandOptionData[]
  public abstract execute(interaction: ChatInputCommandInteraction): any
}
