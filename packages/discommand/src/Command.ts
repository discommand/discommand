import type { ApplicationCommandData, CommandInteraction } from 'discord.js'
import { Base } from './Bases/index.js'

export abstract class Command extends Base {
  protected constructor(public readonly data: ApplicationCommandData) {
    super(data.name)
  }
  public abstract execute(interaction: CommandInteraction): unknown

  public toJSON(): ApplicationCommandData {
    return { ...this.data }
  }
}
