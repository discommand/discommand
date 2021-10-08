const { Client } = require('discord.js')
const { Command } = require('../../dist')
const { token } = require('../config.json')
const path = require('path')

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  loadType: 'FOLDER',
})

cmd.loadCommand()

cmd.run()

client.on('debug', console.info)

client.login(token)
