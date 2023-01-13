import type {
  LocalizationMap,
  ApplicationCommandOptionData,
  ChatInputCommandInteraction,
  ChatInputApplicationCommandData,
} from 'discord.js'
import { ApplicationCommandType } from 'discord.js'

export abstract class Command implements ChatInputApplicationCommandData {
  name: string = ''
  nameLocalizations?: LocalizationMap
  description: string = ''
  descriptionLocalizations?: LocalizationMap
  options?: ApplicationCommandOptionData[]
  public data?: ChatInputApplicationCommandData
  abstract execute(interaction: ChatInputCommandInteraction): any

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
