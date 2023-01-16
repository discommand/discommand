import type { Debugger } from './Debugger'
import type { ChatInputCommandInteraction } from 'discord.js'

export default abstract class {
  protected constructor(public readonly _debugger: Debugger) {}
  public abstract execute(interaction: ChatInputCommandInteraction): unknown
}
