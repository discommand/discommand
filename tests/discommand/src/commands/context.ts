import {
  ApplicationCommandType,
  type UserContextMenuCommandInteraction,
} from 'discord.js'
import { Command } from 'discommand'

export default class TestUserCtxMenu extends Command {
  constructor() {
    super({
      type: ApplicationCommandType.User,
      name: 'pinga',
    })
  }
  execute(interaction: UserContextMenuCommandInteraction) {
    interaction.reply(`${interaction.targetUser.username} Hello!`)
  }
}
