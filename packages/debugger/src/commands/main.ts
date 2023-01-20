import Base from '../Base.js'
import type { Debugger } from '../Debugger.js'
import {
  type ChatInputCommandInteraction,
  version as djsVersion,
} from 'discord.js'
import { version as debuggerVersion } from '../../package.json'
import { version as discommandVersion } from 'discommand'
import { platform, arch } from 'os'

export default class Main extends Base {
  constructor(_debugger: Debugger) {
    super(_debugger)
  }
  execute(interaction: ChatInputCommandInteraction) {
    const client = interaction.client
    let content = `@discommand/debugger v\`${debuggerVersion}\`
discommand v\`${discommandVersion}\`
discord.js v\`${djsVersion}\`
Node.JS v\`${process.versions.node}\` on \`${platform()} ${arch()}\`

`

    content += `Websocket ping: \`${client.ws.ping}\`ms`

    interaction.reply({ content, ephemeral: true })
  }
}
