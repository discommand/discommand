import { Command } from 'discommand'
import type { Debugger } from '../Debugger'
import { type ChatInputCommandInteraction } from 'discord.js'

export default class DebuggerCommands extends Command {
  constructor(public readonly _debugger: Debugger) {
    super('debugger')
    this.data = {
      name: 'debugger',
      description: "discommand's debugger",
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    const _debugger = this._debugger

    if (!_debugger.options.owners.includes(interaction.user.id))
      return _debugger.options.noPermMessages
        ? interaction.reply({
            content: _debugger.options.noPermMessages,
            ephemeral: true,
          })
        : null

    switch (interaction.options.getSubcommand()) {
      case 'main':
        import('./main').then(a =>
          new a.default(_debugger).execute(interaction)
        )
    }
  }
}
