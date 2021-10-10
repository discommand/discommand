import { Message } from 'discord.js'
import { MessageCommand } from '../../../dist'

export = class extends MessageCommand {
  name = 'ping'
  execute(msg: Message, args: string[]) {
    msg.reply('pong!')
  }
}
