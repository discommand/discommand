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
    },
  }
)

client.loadAll()
client.login(config.token)
