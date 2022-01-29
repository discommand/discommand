import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { Listener } from '../../dist'

export = class extends Listener {
  name = 'ready'
  execute(): any {
    console.log('test')
  }
}
