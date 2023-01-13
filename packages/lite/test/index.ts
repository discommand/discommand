import { CommandHandler } from '../dist'
import { Client, GatewayIntentBits } from 'discord.js'
import * as path from 'path'

const config = require('./config.json')
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const cmd = new CommandHandler(client, {
  // loadType: LoadType.File,
  directory: path.join(__dirname, 'commands'),
})

cmd.loadAll()
client.login(config.token)
