import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  CommandInteraction,
} from 'discord.js'
import { DiscommandHandler } from '.'

export class Command {
  name: string = ''
  description: string = ''
  type?: ApplicationCommandType = 'CHAT_INPUT'
  options?: ApplicationCommandOptionData[]
  defaultPermission?: boolean
  execute(
    interaction: CommandInteraction,
    DiscommandHandler: DiscommandHandler
  ): any {}
}
