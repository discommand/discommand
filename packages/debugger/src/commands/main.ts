import Base from '../Base.js'
import type { Debugger } from '../Debugger.js'
import {
  type ChatInputCommandInteraction,
  version as djsVersion,
} from 'discord.js'
import { version as debuggerVersion } from '../index.js'
import { version as discommandVersion } from 'discommand'
import { platform, arch } from 'os'

export default class Main extends Base {
  constructor(_debugger: Debugger) {
    super(_debugger)
  }
  public execute(interaction: ChatInputCommandInteraction) {
    const client = interaction.client
    const cached = `${client.guilds.cache.size} guild(s), ${client.users.cache.size} user(s) cached.`
    let content = `@discommand/debugger v\`${debuggerVersion}\`
discommand v\`${discommandVersion}\`
discord.js v\`${djsVersion}\`
Node.JS v\`${process.versions.node}\` on \`${platform()} ${arch()}\`
PID ${process.pid}\n`

    if (client.shard) {
      content += `PPID ${process.ppid}

${client.shard.count} shard(s). ${cached}\n\n`
    } else {
      content += `\nnot sharded. ${cached}\n\n`
    }
    content += `Websocket ping: \`${client.ws.ping}\`ms`

    interaction.reply({ content, ephemeral: true })
  }
}
