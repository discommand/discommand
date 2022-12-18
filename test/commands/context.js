const { UserContextMenu } = require('../../dist')

module.exports = class TestUserCtxMenu extends UserContextMenu {
  constructor() {
    super()
    this.name = 'test'
  }
  execute(interaction) {
    interaction.reply(`${interaction.targetUser.username} Hello!`)
  }
}
