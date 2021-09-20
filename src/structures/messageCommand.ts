import { Message, Client } from 'discord.js'

interface commandOptions {
  name: string
  description?: string
  aliases?: string[]
}

export class MessageCommand implements commandOptions {
  name: string = ''
  description?: string = ''
  aliases?: string[] = ['']
  execute(msg: Message, client: Client, args: any): any {}
}
