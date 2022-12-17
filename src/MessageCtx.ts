import {
  LocalizationMap,
  MessageContextMenuCommandInteraction,
  PermissionResolvable,
} from 'discord.js'
import { Base } from './Base'

/**
 * @abstract
 */
export abstract class MessageContextMenu extends Base {
  public nameLocalizations?: LocalizationMap
  public defaultMemberPermissions?: PermissionResolvable
  public abstract execute(
    interaction: MessageContextMenuCommandInteraction
  ): any
}
