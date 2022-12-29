import { readdirSync } from 'fs'
import { type ModuleType } from '..'

export const loadModule = (fileDir: string) => {
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
