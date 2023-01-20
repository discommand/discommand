import { readdirSync } from 'node:fs'
import type {
  DeloadOptions,
  ModuleType,
  ReloadOptions,
} from '../types/index.js'

export const returnDir = (fileDir: string): string[] => {
  const dir: string[] = []
  for (const dirent of readdirSync(fileDir, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      for (const file of readdirSync(`${fileDir}/${dirent.name}`)) {
        dir.push(`${fileDir}/${dirent.name}/${file}`)
      }
    } else if (dirent.isFile()) {
      dir.push(`${fileDir}/${dirent.name}`)
    }
  }
  return dir
}

export const loadModule = async (fileDir: string): Promise<ModuleType[]> => {
  const modules: ModuleType[] = []
  for (const dir of returnDir(fileDir)) {
    const tempModule = await import(dir)
    if (!tempModule.default) modules.push(new tempModule())
    else modules.push(new tempModule.default())
  }
  return modules
}

export const deloadModule = (fileDir: string): DeloadOptions[] => {
  const modules: DeloadOptions[] = []
  loadModule(fileDir) //
    .then(module =>
      module.forEach(module => {
        returnDir(fileDir).forEach(dir => {
          modules.push({
            module: module,
            fileDir: dir,
          })
        })
      })
    )
  return modules
}

export const reloadModule = (fileDir: string): ReloadOptions[] => {
  const modules: ReloadOptions[] = []
  loadModule(fileDir) //
    .then(module =>
      module.forEach(module => {
        modules.push({
          module: module,
          fileDir,
        })
      })
    )
  return modules
}
