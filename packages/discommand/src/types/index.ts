import type { Snowflake } from 'discord.js'
import type { Command } from '../command.js'
import type { Listener } from '../listener.js'
import type { DiscommandHandler } from '../discommandHandler.js'
import type { BasePlugin } from '../bases/index.js'
import type { BaseModuleLoader } from '@discommand/loader'

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
  plugins?: Array<BasePlugin>
  loader?: BaseModuleLoader
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
