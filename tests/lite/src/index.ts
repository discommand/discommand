import { Client, GatewayIntentBits } from 'discord.js'
import { CommandHandler } from '@discommand/lite'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const handler = new CommandHandler(client, {
  directory: join(dirname(fileURLToPath(import.meta.url)), 'commands'),
})

client.login(process.env.TOKEN).then(() => handler.loadAll())
