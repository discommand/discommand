import {
  type ApplicationCommandData,
  type CommandInteraction,
} from 'discord.js'
import { Base } from './Bases'
import { DiscommandError } from './error'

export abstract class Command extends Base {
  public data?: ApplicationCommandData
  public abstract execute(interaction: CommandInteraction): unknown

  public toJSON(): ApplicationCommandData {
    if (!this.data)
      throw new DiscommandError('data field is null or undefined.')
    return { ...this.data }
  }
}
