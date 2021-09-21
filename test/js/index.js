const { Client } = require('discord.js')
const { Command } = require('../../dist')
const { token, guildId } = require('../config.json')
const path = require('path')

const client = new Client({ intents: ['GUILDS'] })

const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  slash: true,
  loadType: 'FOLDER',
  slashType: 'GUILD',
  token,
  guildId,
})

cmd.loadCommand()

cmd.run()

client.login(token)
