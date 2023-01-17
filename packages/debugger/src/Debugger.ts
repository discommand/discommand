import { DiscommandClient } from 'discommand'
import type { DebuggerOptions } from './types'

export class Debugger {
  public constructor(
    protected readonly client: DiscommandClient,
    public readonly options: DebuggerOptions
  ) {}

  public run() {
    this.client
      .on('interactionCreate', interaction => {
        if (interaction.isChatInputCommand()) {
          import('./commands/debugger').then(a =>
            new a.default(this).execute(interaction)
          )
        }
      })
      .once('ready', () => {
        import('./commands/debugger').then(a =>
          this.client.application?.commands.create(new a.default(this).toJSON())
        )
      })
  }
}
