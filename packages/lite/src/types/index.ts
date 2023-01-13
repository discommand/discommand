export enum LoadType {
  File = 0,
  Folder = 1,
}

export interface Options {
  loadType?: LoadType
  directory: string
}
