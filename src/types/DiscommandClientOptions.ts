import { loadType } from "."

export type DiscommandClientOptions = {
  loadType: loadType
  CommandHandlerDirectory: string
  ListenerDirectory?: string
}
