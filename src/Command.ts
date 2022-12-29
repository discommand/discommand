import {
  type MessageContextMenuCommandInteraction,
  type UserContextMenuCommandInteraction,
  type ChatInputCommandInteraction,
  type ApplicationCommandData,
} from 'discord.js'
import { Base } from './Bases'

export abstract class Command extends Base {
  public data?: ApplicationCommandData
  public abstract execute(
    interaction:
      | ChatInputCommandInteraction
      | MessageContextMenuCommandInteraction
      | UserContextMenuCommandInteraction
  ): unknown

  public toJSON(): ApplicationCommandData {
    return { ...this.data! }
  }
}
