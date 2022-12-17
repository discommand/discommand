import { UserContextMenuCommandInteraction, CacheType } from 'discord.js'
import { UserContextMenu } from '../../dist'

export default class TestUserCtxMenu extends UserContextMenu {
  public constructor() {
    super()
    this.name = 'test'
  }
  execute(interaction: UserContextMenuCommandInteraction) {
    interaction.reply(`${interaction.targetUser.username} Hello!`)
  }
}
