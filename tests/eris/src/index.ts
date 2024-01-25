import { DiscommandClient } from '@discommand/eris'
import { Constants } from 'eris'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
new DiscommandClient(
  process.env.TOKEN!,
  {
    intents: [Constants.Intents.guilds],
  },
  {
    directory: {
      command: join(__dirname, 'commands'),
    },
  },
).connect()
