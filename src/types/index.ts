import { type Snowflake } from 'discord.js'
import {
  type MessageContextMenu,
  type UserContextMenu,
  type Command,
  type Listener,
} from '..'

export enum LoadType {
  File = 0,
  Folder = 1,
}

// Discommand Options

export interface DiscommandHandlerOptions {
  loadType: LoadType
  directory: string
  guildID?: Snowflake
}

export interface DiscommandClientOptions {
  loadType: LoadType
  directory: {
    command: string
    listener?: string
  }
  guildID?: Snowflake
}

// Module Type
export type ContextMenuType = MessageContextMenu | UserContextMenu

export type ModuleType = Command | Listener | ContextMenuType

export type ContextMenuTypeString = 'MessageContextMenu' | 'UserContextMenu'

export type ModuleTypeString = 'Command' | 'Listener' | ContextMenuTypeString
