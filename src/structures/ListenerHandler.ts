import { Collection, Client } from 'discord.js'
import { readdirSync } from 'fs'
import { Options } from './types'
import { Listener } from './Listener'

export class ListenerHandler {
  client: Client
  options: Options
  constructor(client: Client, options: Options) {
    this.client = client
    this.options = options
  }

  public events = new Collection()

  public ListenerRegister(file: Listener) {
    console.log(`[discommand] Listener ${file.name} is Loaded.`)
    this.events.set(file.name, file)

    if (file.once) {
      this.client.once(file.name, (...args) => {
        // @ts-ignore
        file.execute(...args)
      })
    } else {
      this.client.on(file.name, (...args) => {
        // @ts-ignore
        file.execute(...args)
      })
    }
  }

  public ListenerLoadAll() {
    const Dir = readdirSync(this.options.path)
    if (this.options.loadType === 'FILE') {
      for (const File of Dir) {
        const TemporaryEvent = require(`${this.options.path}/${File}`)
        const event = new TemporaryEvent()
        this.ListenerRegister(event)
      }
    } else if (this.options.loadType === 'FOLDER') {
      for (const Folder of Dir) {
        const Dir2 = readdirSync(`${this.options.path}/${Folder}`)
        for (const File of Dir2) {
          const TemporaryEvent = require(`${this.options.path}/${Folder}/${File}`)
          const event = new TemporaryEvent()
          this.ListenerRegister(event)
        }
      }
    }
  }

  public ListenerDeloadAll() {
    // @ts-ignore
    const EventName = this.events.map((event: Listener) => event.name)
    for (const Event of EventName) {
      this.events.delete(Event)
    }
  }

  public ListenerReloadAll() {
    this.ListenerDeloadAll()
    this.ListenerLoadAll()
  }
}
