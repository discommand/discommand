const { DiscommandClient } = require('discommand')
const { GatewayIntentBits } = require('discord.js')
const { join } = require('path')
require('dotenv/config')

new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: join(__dirname, 'commands'),
      listener: join(__dirname, 'events'),
    },
  },
).login(process.env.TOKEN)
