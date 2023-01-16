import Base from '../Base'
import type { Debugger } from '../Debugger'
import {
  type ChatInputCommandInteraction,
  version as djsVersion,
} from 'discord.js'
import { version as debuggerVersion } from '../../package.json'

export default class Main extends Base {
  constructor(_debugger: Debugger) {
    super(_debugger)
  }
  execute(interaction: ChatInputCommandInteraction) {
    const content = `@discommand/debugger v${debuggerVersion}
discommand 
discord.js v${djsVersion}
Node.JS v${process.version}`
  }
}
