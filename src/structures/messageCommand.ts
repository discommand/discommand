import { Message } from 'discord.js'
import { Command } from '..'

export interface commandOptions {
  name: string
  description?: string
  aliases?: string[]
}

export class MessageCommand implements commandOptions {
  name: string = ''
  description?: string = ''
  aliases?: string[] = ['']
  execute(msg: Message, args: string[], cmd: Command): any {}
}
