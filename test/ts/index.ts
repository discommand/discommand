import { Client } from 'discord.js'
import { Command } from '../../dist'
import path = require('path')

const { token } = require('../config.json')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  loadType: 'FILE',
})

cmd.loadCommand()

client.login(token)
