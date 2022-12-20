import {
  type ApplicationCommandType,
  type MessageContextMenuCommandInteraction,
  type PermissionResolvable,
  type UserContextMenuCommandInteraction,
  type ApplicationCommandOptionData,
  type ChatInputCommandInteraction,
  type LocalizationMap,
} from 'discord.js'
import { Base } from './Base'

export abstract class Command extends Base {
  public nameLocalizations?: LocalizationMap
  public description: string = ''
  public descriptionLocalizations?: LocalizationMap
  public type?: ApplicationCommandType
  public options?: ApplicationCommandOptionData[]
  public defaultMemberPermissions?: PermissionResolvable
  public dmPermission?: boolean
  public abstract execute(
    interaction:
      | ChatInputCommandInteraction
      | MessageContextMenuCommandInteraction
      | UserContextMenuCommandInteraction
  ): any
}
