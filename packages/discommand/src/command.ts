import type {
  ApplicationCommandData,
  CommandInteraction,
  Snowflake,
  AutocompleteInteraction,
} from 'discord.js'
import { Base } from './Bases/index.js'

export abstract class Command extends Base {
  #guildID?: Snowflake

  get guildID() {
    return this.#guildID
  }

  protected constructor(
    public readonly data: ApplicationCommandData,
    guildID?: Snowflake
  ) {
    super(data.name)
    this.#guildID = guildID
  }

  public abstract execute(interaction: CommandInteraction): unknown

  public abstract autocompleteExecute(
    interaction: AutocompleteInteraction
  ): unknown

  public toJSON(): ApplicationCommandData {
    return { ...this.data }
  }
}
