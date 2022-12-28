import { type Snowflake } from 'discord.js'
import { type Command, type Listener } from '..'

export enum LoadType {
  File = 'FILE',
  Folder = 'FOLDER',
}

export interface directory {
  command: string
  listener?: string
}

// Discommand Options

export interface DiscommandHandlerOptions {
  loadType?: LoadType
  directory: string
  guildID?: Snowflake
}

export interface DiscommandClientOptions {
  loadType: LoadType
  directory: directory
  guildID?: Snowflake
}

export interface deloadOptions {
  modules: ModuleType
  filedir?: string
}

// Module Type
export type ModuleType = Command | Listener
