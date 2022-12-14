import { GatewayIntentBits } from 'discord.js'
import { DiscommandClient, LoadType } from '../dist'
import * as path from 'path'

const config = require('./config.json')
const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: LoadType.File,
    directory: {
      commandFolderDirectory: path.join(__dirname, 'commands'),
      listenerFolderDirectory: path.join(__dirname, 'events'),
    },
  }
)

client.loadAll()
client.login(config.token)

const a = () => {
  client.deloadAll()
}

setTimeout(a, 10000)
