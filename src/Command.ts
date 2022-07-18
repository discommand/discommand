import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  PermissionResolvable,
} from 'discord.js'
import { DiscommandHandler } from '.'

export abstract class Command {
  name: string = ''
  description: string = ''
  type?: ApplicationCommandType = ApplicationCommandType.ChatInput
  options?: ApplicationCommandOptionData[]
  defaultPermission?: PermissionResolvable
  execute(
    interaction: ChatInputCommandInteraction,
    DiscommandHandler: DiscommandHandler
  ): any {}
}
