import { DiscommandClient } from 'discommand'
import { Debugger } from '@discommand/debugger'
import { GatewayIntentBits } from 'discord.js'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: join(dirname(fileURLToPath(import.meta.url)), 'commands'),
    },
  }
)

const discommandDebugger = new Debugger(client, {
  owners: ['415135882006495242'],
  noPermMessages: 'test',
})

discommandDebugger.run()
client.login(process.env.TOKEN)
