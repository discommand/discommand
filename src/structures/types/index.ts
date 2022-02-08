export type loadType = 'FOLDER' | 'FILE'

export interface Options {
  path: string
  loadType: loadType
}
