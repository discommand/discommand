import { Client } from 'discord.js'
import { CommandHandler, ListenerHandler } from '../dist'
import path = require('path')

const { token } = require('./config.json')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
const cmd = new CommandHandler(client, {
  path: path.join(__dirname, 'commands'),
  loadType: 'FILE',
})
const event = new ListenerHandler(client, {
  path: path.join(__dirname, 'events'),
  loadType: 'FILE',
})

event.ListenerLoadAll()

cmd.CommandLoadAll()

client.login(token)
