export enum LoadType {
  File = 0,
  Folder,
}

export type Options = {
  loadType: LoadType
  directory: string
}

export type DiscommandClientOptions = {
  loadType: LoadType
  CommandHandlerDirectory: string
  ListenerDirectory?: string
}

export enum MessageComponentType {
  Button = 0,
  SelectMenu,
  Modal,
}
