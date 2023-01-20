import { Listener } from 'discommand'
import type { Client } from 'discord.js'

export default class extends Listener {
  constructor() {
    super('ready')
  }
  execute(client: Client) {
    console.log(`Login as ${client.user!.tag}`)
  }
}
