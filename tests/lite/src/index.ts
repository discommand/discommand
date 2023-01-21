import { Client, GatewayIntentBits } from 'discord.js'
import { CommandHandler } from '@discommand/lite'
import { join } from 'node:path'
import 'dotenv/config'

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const handler = new CommandHandler(client, {
  directory: join(__dirname, 'commands'),
})

client.login(process.env.TOKEN).then(() => handler.loadAll())
