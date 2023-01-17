import { DiscommandClient } from 'discommand'
import { Debugger } from '@discommand/debugger'
import { GatewayIntentBits } from 'discord.js'
import 'dotenv/config'

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: '',
    },
  }
)

const discommandDebugger = new Debugger(client, {
  owners: ['415135882006495242'],
  noPermMessages: 'test',
})

discommandDebugger.run()
client.login(process.env.TOKEN)
