import type { MessageComponent } from './Component'

export interface ComponentsHandlerOptions {
  directory: string
}

export interface BaseLoadOptions {
  module: MessageComponent
  fileDir: string
}

export { BaseLoadOptions as DeLoadOptions, BaseLoadOptions as ReLoadOptions }
