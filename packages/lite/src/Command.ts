import type {
  LocalizationMap,
  ApplicationCommandOptionData,
  ChatInputCommandInteraction,
  ChatInputApplicationCommandData,
} from 'discord.js'
import { ApplicationCommandType } from 'discord.js'

export abstract class Command implements ChatInputApplicationCommandData {
  public name = ''
  public nameLocalizations?: LocalizationMap
  public description = ''
  public descriptionLocalizations?: LocalizationMap
  public options?: ApplicationCommandOptionData[]
  public data?: ChatInputApplicationCommandData
  public abstract execute(interaction: ChatInputCommandInteraction): unknown

  public toJSON(): ChatInputApplicationCommandData {
    if (this.data) {
      return { ...this.data }
    } else {
      return {
        type: ApplicationCommandType.ChatInput,
        name: this.name,
        nameLocalizations: this.nameLocalizations,
        description: this.description,
        descriptionLocalizations: this.descriptionLocalizations,
        options: this.options,
      }
    }
  }
}
