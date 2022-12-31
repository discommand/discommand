import { readdirSync } from 'fs'
import { type DeloadOptions, type ModuleType, type ReloadOptions } from '..'

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

export const loadModule = (fileDir: string): ModuleType[] => {
  const modules: ModuleType[] = []
  for (const dirent of readdirSync(fileDir, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      for (const file of readdirSync(`${fileDir}/${dirent.name}`)) {
        const tempModule = require(`${fileDir}/${dirent.name}/${file}`)
        if (!tempModule.default) {
          const module: ModuleType = new tempModule()
          modules.push(module)
        } else {
          const module: ModuleType = new tempModule.default()
          modules.push(module)
        }
      }
    } else if (dirent.isFile()) {
      const tempModule = require(`${fileDir}/${dirent.name}`)
      if (!tempModule.default) {
        const module: ModuleType = new tempModule()
        modules.push(module)
      } else {
        const module: ModuleType = new tempModule.default()
        modules.push(module)
      }
    }
  }
  return modules
}

export const deloadModule = (fileDir: string): DeloadOptions[] => {
  const dir = returnDir(fileDir)
  const modules: DeloadOptions[] = []
  loadModule(fileDir).forEach(module => {
    dir.forEach(dir => {
      modules.push({
        module: module,
        fileDir: dir,
      })
    })
  })
  return modules
}

export const reloadModule = (fileDir: string): ReloadOptions[] => {
  const dir = returnDir(fileDir)

  const modules: ReloadOptions[] = []
  loadModule(fileDir).forEach(module => {
    modules.push({
      module: module,
      fileDirs: dir,
      fileDir,
    })
  })
  return modules
}
