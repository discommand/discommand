import { type Client, Collection } from 'discord.js'
import type { MessageComponent } from './Component'
import {
  interactionCreate,
  deloadModule,
  loadModule,
  reloadModule,
} from './utils'
import type {
  DeLoadOptions,
  ReLoadOptions,
  ComponentsHandlerOptions,
} from './types'

export class ComponentHandler {
  public modules: Collection<string, MessageComponent> = new Collection()
  public constructor(
    public readonly client: Client,
    public readonly options: ComponentsHandlerOptions
  ) {
    client.on('ready', () => interactionCreate(this))
  }

  public load(modules: MessageComponent[]) {
    modules.forEach(module => {
      this.modules.set(module.name, module)
      console.log(`[discommand-message-component] ${module.name} is loaded.`)
    })
  }

  public deload(options: DeLoadOptions[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this.modules.delete(module.name)
      delete require.cache[require.resolve(fileDir)]
      console.log(`[discommand-message-component] ${module.name} is deloaded.`)
    })
  }

  public reload(options: ReLoadOptions[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this.modules.delete(module.name)
      delete require.cache[require.resolve(fileDir)]
      this.load([module])
      console.log(`[discommand-message-component] ${module.name} is reloaded.`)
    })
  }

  public async loadAll() {
    this.load(await loadModule(this.options.directory))
  }

  public reloadAll() {
    this.reload(reloadModule(this.options.directory))
  }

  public deloadAll() {
    this.deload(deloadModule(this.options.directory))
  }
}
