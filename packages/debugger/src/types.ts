import type { Snowflake, LocalizationMap } from 'discord.js'

export interface DebuggerOptions {
  owners: Snowflake[]
  noPermMessages: LocalizationMap
}
