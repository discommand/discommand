import { readdir } from 'node:fs/promises'
import type { DeloadOptions, ReloadOptions } from '../types/index.js'

export interface BaseModuleLoader {
  loadModule<T>(fileDir: string): Promise<T[]>
  deloadModule<T>(fileDir: string): DeloadOptions<T>[]
  reloadModule<T>(fileDir: string): ReloadOptions<T>[]
}

export class ModuleLoader implements BaseModuleLoader {
  private async returnDir(fileDir: string): Promise<string[]> {
    const dir: string[] = []
    const files = await readdir(fileDir, { withFileTypes: true })
    for (const file of files) {
      if (file.isDirectory()) {
        const files = await readdir(`${fileDir}/${file.name}`)
        for (const file2 of files) {
          dir.push(`${fileDir}/${file.name}/${file2}`)
        }
      } else {
        if (file.name.endsWith('.js') || file.name.endsWith('.ts')) {
          dir.push(`${fileDir}/${file.name}`)
        }
      }
    }
    return dir
  }

  public async loadModule<T>(fileDir: string): Promise<T[]> {
    const modules: T[] = []
    for (const dir of await this.returnDir(fileDir)) {
      const tempModule = await import(dir)
      if (!tempModule.default) modules.push(new tempModule())
      else modules.push(new tempModule.default())
    }
    return modules
  }

  public deloadModule<T>(fileDir: string): DeloadOptions<T>[] {
    const modules: DeloadOptions<T>[] = []
    this.loadModule<T>(fileDir) //
      .then(module =>
        module.forEach(async module => {
          const dirs = await this.returnDir(fileDir)
          for (const dir of dirs) {
            modules.push({
              module,
              fileDir: dir,
            })
          }
        })
      )
    return modules
  }

  public reloadModule<T>(fileDir: string): ReloadOptions<T>[] {
    const modules: ReloadOptions<T>[] = []
    this.loadModule<T>(fileDir) //
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
}
