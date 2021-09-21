import { Client } from 'discord.js'
import { Command } from '../../dist'
import path = require('path')

const { token, guildId } = require('../config.json')

const client = new Client({ intents: ['GUILDS'] })
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  slash: true,
  loadType: 'FILE',
  slashType: 'GUILD',
  token,
  guildId,
})

cmd.loadCommand()

cmd.run()

client.login(token)
