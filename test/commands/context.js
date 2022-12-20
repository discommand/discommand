const { ApplicationCommandType } = require('discord.js')
const { Command } = require('../../dist/src')

module.exports = class TestUserCtxMenu extends Command {
  constructor() {
    super()
    this.name = 'pinga'
    this.type = ApplicationCommandType.User
  }
  execute(interaction) {
    interaction.reply(`${interaction.targetUser.username} Hello!`)
  }
}
