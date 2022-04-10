export type loadType = 'FILE' | 'FOLDER'

export type DiscommandClientOptions = {
  loadType: loadType
  CommandHandlerDirectory: string
  ListenerDirectory?: string
}
