import { Message } from 'discord.js'
import { MessageCommand } from '../../../dist'

export class command extends MessageCommand {
  name = 'ping'
  execute(msg: Message, args: any) {
    msg.reply(args[0] as string)
  }
}
