const { DiscommandClient, LoadType } = require('..')
const { GatewayIntentBits } = require('discord.js')
const { join } = require('path')
const { token, guildID } = require('./config.json')
const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: LoadType.File,
    directory: {
      command: join(__dirname, 'commands'),
      listener: join(__dirname, 'events'),
    },
    guildID,
  }
)

client.start(token)
