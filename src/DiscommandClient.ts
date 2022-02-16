import { Client, ClientOptions } from 'discord.js'

export class DiscommandClient extends Client {
  constructor(options: ClientOptions) {
    super(options)
    this.options = options
  }
}
