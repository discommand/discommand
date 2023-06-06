import {
  BasePlugin,
  DiscommandClient,
  reloadModule,
  loadModule,
  deloadModule,
  DeloadOptions,
  ReloadOptions,
} from 'discommand'
import { Collection } from 'discord.js'
import { MessageComponent } from './Component.js'
import { ComponentsHandlerOptions } from './types.js'
import { interactionCreate } from './utils/index.js'

export class ComponentPlugin extends BasePlugin {
  public modules: Collection<string, MessageComponent> = new Collection()
  public constructor(public readonly options: ComponentsHandlerOptions) {
    super()
  }
  public start(client: DiscommandClient): this {
    this.loadAll()
    interactionCreate(this, client)
    return super.start(client)
  }
  public load(modules: MessageComponent[]) {
    modules.forEach(module => {
      this.modules.set(module.name, module)
      console.log(`[discommand@message-component] ${module.name} is loaded.`)
    })
  }

  public deload(options: DeloadOptions<MessageComponent>[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this.modules.delete(module.name)
      if (fileDir) delete require.cache[require.resolve(fileDir)]
      console.log(`[discommand@message-component] ${module.name} is deloaded.`)
    })
  }

  public reload(options: ReloadOptions<MessageComponent>[]) {
    options.forEach(option => {
      const { module, fileDir } = option
      this.modules.delete(module.name)
      delete require.cache[require.resolve(fileDir)]
      this.load([module])
      console.log(`[discommand@message-component] ${module.name} is reloaded.`)
    })
  }

  public loadAll() {
    loadModule<MessageComponent>(this.options.directory) //
      .then((module: MessageComponent[]) => this.load(module))
  }

  public reloadAll() {
    this.reload(reloadModule(this.options.directory))
  }

  public deloadAll() {
    this.deload(deloadModule(this.options.directory))
  }
}
