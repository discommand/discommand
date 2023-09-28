import { readdirSync } from 'node:fs'
import type { DeloadOptions, ReloadOptions } from '../types/index.js'

export const returnDir = (fileDir: string): string[] => {
  const dir: string[] = []
  for (const dirent of readdirSync(fileDir, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
        dir.push(`${fileDir}/${dirent.name}/${file}`)
      }
    } else if (dirent.isFile()) {
      dir.push(`${fileDir}/${dirent.name}`)
    }
  }
  return dir
}

export async function loadModule<T>(fileDir: string): Promise<T[]> {
  const modules: T[] = []
  for (const dir of returnDir(fileDir)) {
    const tempModule = await import(dir)
    if (!tempModule.default) modules.push(new tempModule())
    else modules.push(new tempModule.default())
  }
  return modules
}

export function deloadModule<T>(fileDir: string): DeloadOptions<T>[] {
  const modules: DeloadOptions<T>[] = []
  loadModule<T>(fileDir) //
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

export function reloadModule<T>(fileDir: string): ReloadOptions<T>[] {
  const modules: ReloadOptions<T>[] = []
  loadModule<T>(fileDir) //
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
