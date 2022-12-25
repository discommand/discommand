import { Intents } from 'discord.js'
import { DiscommandClient } from '../dist'
import * as path from 'path'

const config = require('./config.json')
const client = new DiscommandClient(
  {
    intents: [Intents.FLAGS.GUILDS],
  },
  {
    loadType: 'FILE',
    CommandHandlerDirectory: path.join(__dirname, 'commands'),
    // ListenerDirectory: path.join(__dirname, 'events'),
  }
)

client.loadAll()
client.login(config.token)
