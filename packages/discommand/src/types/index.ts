import type { Snowflake } from 'discord.js'
import type { Command } from '../command.js'
import type { Listener } from '../listener.js'
import type { DiscommandHandler } from '../discommandHandler.js'
import type { BasePlugin } from '../Bases/index.js'
import type { BaseModuleLoader } from '../utils/index.js'

export interface directory {
  command: string
  listener?: string
}

// Discommand Options
export interface DiscommandHandlerOptions {
  directory: string
  guildID?: Snowflake
  loader?: BaseModuleLoader
}

export interface DiscommandClientOptions {
  directory: directory
  guildID?: Snowflake
  plugins?: [BasePlugin]
  loader?: BaseModuleLoader
}

// Load options
export interface BaseLoadOptions<T> {
  module: T
}

export interface DeloadOptions<T> extends BaseLoadOptions<T> {
  fileDir?: string
}

export interface ReloadOptions<T> extends BaseLoadOptions<T> {
  fileDir: string
  nextModule?: T
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
