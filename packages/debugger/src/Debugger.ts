import { BasePlugin, DiscommandClient } from 'discommand'
import type { DebuggerOptions } from './types.js'

export class Debugger extends BasePlugin {
  public constructor(
    protected readonly client: DiscommandClient,
    public readonly options: DebuggerOptions
  ) {
    super()
  }

  public start(client: DiscommandClient) {
    client
      .on('interactionCreate', interaction => {
        if (interaction.isChatInputCommand()) {
          if (interaction.commandName === 'debugger')
            import('./commands/debugger.js').then(a =>
              new a.default(this).execute(interaction)
            )
        }
      })
      .once('ready', () => {
        import('./commands/debugger.js').then(a =>
          this.client.application?.commands.create(new a.default(this).toJSON())
        )
      })
    return this
  }
}
