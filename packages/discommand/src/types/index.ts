import type { Snowflake } from 'discord.js'
import type { Command } from '../Command.js'
import type { Listener } from '../Listener.js'
import type { DiscommandHandler } from '../DiscommandHandler.js'

export interface directory {
  command: string
  listener?: string
}

// Discommand Options
export interface DiscommandHandlerOptions {
  directory: string
  guildID?: Snowflake
}

export interface DiscommandClientOptions {
  directory: directory
  guildID?: Snowflake
}

// Load options
export interface BaseLoadOptions {
  module: ModuleType
}

export interface DeloadOptions extends BaseLoadOptions {
  fileDir?: string
}

export interface ReloadOptions extends BaseLoadOptions {
  fileDir: string
  nextModule?: ModuleType
}

// Module Type
export type ModuleType = Command | Listener

// declaration
declare module 'discord.js' {
  interface Client {
    commandHandler: DiscommandHandler
    listenerHandler?: DiscommandHandler
    loadAll(): void
    deloadAll(): void
    reloadAll(): void
  }
}
