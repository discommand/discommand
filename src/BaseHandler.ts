import { Client } from 'discord.js'
import { Options } from './types/Options'
import { readdirSync } from 'fs'

export class BaseHandler {
  client: Client
  options: Options
  public constructor(client: Client, options: Options) {
    this.client = client
    this.options = options
  }

  private Register() {}

  public loadAll() {
    const Dir = readdirSync(this.options.directory)

    if (this.options.loadType === 'FILE') {
      for (const File of Dir) {
        const Temp = require(`${this.options.directory}/${File}`)
        const command = new Temp()
      }
    }
  }
}
