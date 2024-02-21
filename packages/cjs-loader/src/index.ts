import { readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export interface BaseLoadOptions<T> {
  module: T
}

export interface DeloadOptions<T> extends BaseLoadOptions<T> {
  fileDir?: string
}

export interface ReloadOptions<T> extends BaseLoadOptions<T> {
  fileDir: string
  nextModule?: T
}

export interface BaseModuleLoader {
  loadModule<T>(fileDir: string): Promise<T[]>
  deloadModule<T>(fileDir: string): DeloadOptions<T>[]
  reloadModule<T>(fileDir: string): ReloadOptions<T>[]
}

export class ModuleLoader implements BaseModuleLoader {
  private async returnDir(fileDir: string): Promise<string[]> {
    const dir: string[] = []
    for (const file of readdirSync(fileDir, { withFileTypes: true })) {
      if (file.isDirectory()) {
        for (const file2 of readdirSync(`${fileDir}/${file.name}`)) {
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
      const tempModule = require(pathToFileURL(dir).toString())
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
        }),
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
        }),
      )
    return modules
  }
}
