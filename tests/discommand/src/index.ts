import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: join(__dirname, 'commands'),
      listener: join(__dirname, 'events'),
    },
  }
).login(process.env.TOKEN)
