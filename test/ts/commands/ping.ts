import { Message } from 'discord.js'
import { Command, MessageCommand } from '../../../dist'

export = class extends MessageCommand {
  name = 'ping'
  execute(msg: Message, args: string[], cmd: Command) {
    msg.reply('pong!')
  }
}
