const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require('discord.js')
const { ComponentHandler } = require('..')
const { join } = require('path')
const { token } = require('./config.json')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
})

const handler = new ComponentHandler(client, {
  directory: join(__dirname, 'components'),
})

handler.loadAll()

client.login(token)

client.on('messageCreate', msg => {
  if (msg.author.bot) return
  if (msg.content.startsWith('msg'))
    msg.reply({
      content: 'a',
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('a')
            .setLabel('a')
            .setStyle(ButtonStyle.Primary)
        ),
      ],
    })
})
