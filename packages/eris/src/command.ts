import { Base } from './bases/index.js'
import { ApplicationCommandData } from './types.js'
import { AutocompleteInteraction, CommandInteraction } from 'eris'

export abstract class Command extends Base {
  protected constructor(
    public data: ApplicationCommandData,
    public guildId?: string,
  ) {
    super(data.name)
  }

  public abstract execute(interaction: CommandInteraction): unknown

  public autocompleteExecute(
    interaction: AutocompleteInteraction,
  ): unknown {
    return undefined
  }

  public toJSON(): ApplicationCommandData {
    return { ...this.data }
  }
}
