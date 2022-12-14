import {
  type ApplicationCommandOptionData,
  type ApplicationCommandType,
  type ChatInputCommandInteraction,
  type Locale,
  type PermissionResolvable,
} from 'discord.js'

export abstract class Command {
  name: string = ''
  nameLocalizations?: Record<Locale, string>
  description: string = ''
  descriptionLocalizations?: Record<Locale, string>
  type?: ApplicationCommandType
  options?: ApplicationCommandOptionData[]
  defaultPermission?: PermissionResolvable
  execute(interaction: ChatInputCommandInteraction): void {}
}
