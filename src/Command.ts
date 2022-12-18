import {
  type ApplicationCommandOptionData,
  type ChatInputCommandInteraction,
  type LocalizationMap,
} from 'discord.js'
import { Base } from './Base'
import { type ModuleTypeString } from './types'

/**
 * @abstract
 */
export abstract class Command extends Base {
  public nameLocalizations?: LocalizationMap
  public description: string = ''
  public descriptionLocalizations?: LocalizationMap
  /**
   * @readonly
   */
  public readonly type: ModuleTypeString = 'Command'
  public options?: ApplicationCommandOptionData[]
  public abstract execute(interaction: ChatInputCommandInteraction): any
}
