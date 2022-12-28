import { readdirSync } from 'fs'
import { type ModuleType } from '..'
import { DiscommandError } from '../error'

export function loadModule(fileDir: string) {
  const modules: ModuleType[] = []
  const dir = readdirSync(fileDir, { withFileTypes: true })
  for (const files of dir) {
    console.log(files)
    if (files.isFile()) {
      const tempModules = require(`${fileDir}/${files.name}`)
      if (!tempModules.default) {
        modules.push(new tempModules())
      } else {
        modules.push(new tempModules.default())
      }

      modules.forEach(module => {
        if (!module.name)
          throw new DiscommandError(`The name is missing from ${files}`)
      })

      return modules
    } else if (files.isDirectory()) {
      for (const file of readdirSync(`${fileDir}/${files.name}`)) {
        const tempModules = require(`${fileDir}/${files.name}/${file}`)
        const modules: ModuleType[] = []
        if (!tempModules.default) {
          modules.push(new tempModules())
        } else {
          modules.push(new tempModules.default())
        }

        for (const module of modules) {
          if (!module.name)
            throw new DiscommandError(
              `The name is missing from ${files.name}/${file}`
            )
        }

        return modules
      }
    }
  }
}
