import { DiscommandHandler } from 'discommand'
import type { DebuggerOptions } from './types'
import { type Client } from 'discord.js'
import { join } from 'path'

export class Debugger {
  public debuggerHandler: DiscommandHandler
  public constructor(
    public readonly client: Client,
    private handler: DiscommandHandler,
    public readonly options: DebuggerOptions
  ) {
    this.debuggerHandler = new DiscommandHandler(client, {
      directory: join(__dirname, 'commands', 'commands'),
    })
  }
}
