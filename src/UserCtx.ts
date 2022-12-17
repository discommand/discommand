import {
  LocalizationMap,
  PermissionResolvable,
  UserContextMenuCommandInteraction,
} from 'discord.js'
import { Base } from './Base'

/**
 * @abstract
 */
export abstract class UserContextMenu extends Base {
  public nameLocalizations?: LocalizationMap
  public defaultMemberPermissions?: PermissionResolvable
  public abstract execute(interaction: UserContextMenuCommandInteraction): any
}
