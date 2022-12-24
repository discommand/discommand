import { type Snowflake } from 'discord.js'
import { type Command, type Listener } from '..'

export enum LoadType {
  File = 0,
  Folder = 1,
}

export interface directory {
  command: string
  listener?: string
}

// Discommand Options

export interface DiscommandHandlerOptions {
  loadType: LoadType
  directory: string
  guildID?: Snowflake
}

export interface DiscommandClientOptions {
  loadType: LoadType
  directory: directory
  guildID?: Snowflake
}

// Module Type
export type ModuleType = Command | Listener

export type ContextMenuTypeString = 'MessageContextMenu' | 'UserContextMenu'
