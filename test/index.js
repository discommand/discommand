const { DiscommandClient, LoadType } = require('../dist')
const { GatewayIntentBits } = require('discord.js')
const path = require('path')
const config = require('./config.json')
const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: LoadType.File,
    directory: {
      command: path.join(__dirname, 'commands'),
      listener: path.join(__dirname, 'events'),
    },
    guildID: '863380858681557003',
  }
)

client.loadAll()
client.login(config.token)
