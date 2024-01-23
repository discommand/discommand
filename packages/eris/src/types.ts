import { Locale } from 'discord-api-types/v10'

export type LocalizationMap = Record<Locale, string>

export interface ApplicationCommandOptionChoiceData {
  name: string
  nameLocalizations: LocalizationMap
  value: string | number
}

export interface ApplicationCommandOptionData {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  name: string
  nameLocalizations: LocalizationMap
  description: string
  descriptionLocalizations: LocalizationMap
  autocomplete: boolean
  required: boolean
  choices: Array<ApplicationCommandOptionChoiceData>
  options: Array<ApplicationCommandOptionData>
  channelTypes: Array<string> | Array<1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13>
  minValue: number
  maxValue: number
  minLength: number
  maxLength: number
}

export interface ApplicationCommandData {
  name: string
  nameLocalizations: LocalizationMap
  description: string
  descriptionLocalizations: LocalizationMap
  nsfw: boolean
  type: 1 | 2 | 3
  options: Array<ApplicationCommandOptionData>
  defaultMemberPermissions: Array<string> | Array<bigint>
  dmPermission: boolean
}
