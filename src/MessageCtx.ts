import {
  LocalizationMap,
  MessageContextMenuCommandInteraction,
  PermissionResolvable,
} from 'discord.js'
import { ModuleTypeString } from '.'
import { Base } from './Base'

/**
 * @abstract
 */
export abstract class MessageContextMenu extends Base {
  public nameLocalizations?: LocalizationMap
  public defaultMemberPermissions?: PermissionResolvable
  /**
   * @readonly
   */
  public readonly type: ModuleTypeString = 'MessageContextMenu'
  public abstract execute(
    interaction: MessageContextMenuCommandInteraction
  ): any
}
