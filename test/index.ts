import { Client } from 'discord.js'
import { CommandHandler } from '../dist'
import path = require('path')

const { token } = require('./config.json')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const cmd = new CommandHandler(client, {
  path: path.join(__dirname, 'commands'),
  loadType: 'FILE',
})

cmd.loadCommand()

client.login(token)
