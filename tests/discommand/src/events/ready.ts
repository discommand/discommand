import { Listener } from 'discommand'
import { type Client, ActivityType } from 'discord.js'

export default class extends Listener {
  constructor() {
    super('ready')
  }
  execute(client: Client) {
    console.log(`Login as ${client.user!.tag}`)
    client.user!.setActivity('asdf', { type: ActivityType.Playing })
  }
}
