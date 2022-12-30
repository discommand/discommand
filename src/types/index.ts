import { type Snowflake } from 'discord.js'
import { type Command, type Listener } from '..'
import { type DiscommandHandler } from '../DiscommandHandler'

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
  fileDir?: string
}

export interface reloadOptions extends deloadOptions {
  fileDir: string
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
