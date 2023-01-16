import { DiscommandHandler } from 'discommand'
import type { DebuggerOptions } from './types'
import { type Client } from 'discord.js'

export class Debugger {
  protected readonly client: Client
  public constructor(
    protected readonly handler: DiscommandHandler,
    public readonly options: DebuggerOptions
  ) {
    this.client = handler.client
  }

  public run() {
    this.client.on('interactionCreate', interaction => {
      console.log('a')
    })
  }
}
