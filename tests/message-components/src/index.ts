import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  GatewayIntentBits,
} from 'discord.js'
import { ComponentPlugin } from '@discommand/message-components'
import { DiscommandClient } from 'discommand'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const client = new DiscommandClient(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  },
  {
    directory: {
      command: join(__dirname, '..', '..', 'discommand', 'src', 'commands'),
    },
    plugins: [
      new ComponentPlugin({
        directory: join(__dirname, 'components'),
      }),
    ],
  }
)

client.login(process.env.TOKEN)

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
