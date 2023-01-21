import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  GatewayIntentBits,
} from 'discord.js'
import { ComponentHandler } from '@discommand/message-components'
import { join } from 'node:path'
import 'dotenv/config'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})
const handler = new ComponentHandler(client, {
  directory: join(__dirname, 'components'),
})

client.login(process.env.TOKEN).then(() => handler.loadAll())

client.on('messageCreate', msg => {
  if (msg.author.bot) return
  if (msg.content.startsWith('msg'))
    msg.reply({
      content: 'a',
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId('a')
            .setLabel('a')
            .setStyle(ButtonStyle.Primary)
        ),
      ],
    })
})
