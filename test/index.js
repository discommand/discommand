const { DiscommandClient } = require('..')
const { GatewayIntentBits } = require('discord.js')
const { join } = require('path')
const { token, guildID } = require('./config.json')
const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: join(__dirname, 'commands'),
      listener: join(__dirname, 'events'),
    },
    guildID,
  }
)

client.start(token)
