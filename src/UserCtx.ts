import {
  LocalizationMap,
  PermissionResolvable,
  UserContextMenuCommandInteraction,
} from 'discord.js'
import { ModuleTypeString } from '.'
import { Base } from './Base'

/**
 * @abstract
 */
export abstract class UserContextMenu extends Base {
  public nameLocalizations?: LocalizationMap
  public defaultMemberPermissions?: PermissionResolvable
  /**
   * @readonly
   */
  public readonly type: ModuleTypeString = 'UserContextMenu'
  public abstract execute(interaction: UserContextMenuCommandInteraction): any
}
