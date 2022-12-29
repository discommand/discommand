import { readdirSync } from 'fs'
import { deloadOptions, type ModuleType } from '..'

export const loadModule = (fileDir: string): ModuleType[] => {
  const modules: ModuleType[] = []
  const dir = readdirSync(fileDir, { withFileTypes: true })
  for (const dirent of dir) {
    if (dirent.isDirectory()) {
      const dir = readdirSync(dirent.name)
      for (const file of dir) {
        const tempModule = require(`${fileDir}/${dirent.name}/${file}`)
        const module: ModuleType = new tempModule()
        modules.push(module)
      }
    } else if (dirent.isFile()) {
      const tempModule = require(`${fileDir}/${dirent.name}`)
      const module: ModuleType = new tempModule()
      modules.push(module)
    }
  }
  return modules
}

export const deloadModule = (fileDir: string) => {
  let dir: string
  for (const dirent of readdirSync(fileDir, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      readdirSync(dirent.name)
      for (const file of readdirSync(dirent.name)) {
        dir = `${fileDir}/${dirent.name}/${file}`
      }
    } else if (dirent.isFile()) {
      dir = `${fileDir}/${dirent.name}`
    }
  }
  const modules: deloadOptions[] = []
  loadModule(fileDir).forEach(module => {
    modules.push({
      modules: module,
      fileDir: dir,
    })
  })
  return modules
}
