const { ApplicationCommandType } = require('discord.js')
const { Command } = require('../..')

module.exports = class TestUserCtxMenu extends Command {
  constructor() {
    super('pinga')
    /**
     * @type {import('discord.js').ApplicationCommandData}
     */
    this.data = {
      type: ApplicationCommandType.User,
      name: 'pinga',
    }
  }
  execute(interaction) {
    interaction.reply(`${interaction.targetUser.username} Hello!`)
  }
}
