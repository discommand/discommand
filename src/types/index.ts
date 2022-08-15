import { type Command, type Listener } from '..'

export enum LoadType {
  File = 0,
  Folder = 1,
}

export interface DiscommandHandlerOptions {
  loadType: LoadType
  directory: string
}

export interface DiscommandClientOptions {
  loadType: LoadType
  directory: {
    commandFolderDirectory: string
    listenerFolderDirectory?: string
  }
}

export type ModuleType = Command | Listener
