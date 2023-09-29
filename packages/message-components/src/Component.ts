import type { MessageComponentInteraction } from 'discord.js'
import { DiscommandError } from './error/index.js'

export abstract class MessageComponent {
  protected constructor(public readonly name: string) {
    if (!name) throw new DiscommandError('name is undefined.')
  }
  public abstract execute(interaction: MessageComponentInteraction): unknown
}
