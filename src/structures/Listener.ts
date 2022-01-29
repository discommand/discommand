import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { ListenerHandler } from '..'

export class Listener {
  name = ''
  once: boolean = false
  execute(): any {}
}
