const { Command } = require('../..')

module.exports = class DeloadCommands extends Command {
  constructor() {
    super('reload')
    /**
     * @type {import('discord.js').ApplicationCommandData}
     */
    this.data = {
      name: 'reload',
      description: 'reload',
    }
  }
  execute(interaction) {
    interaction.client.reloadAll()
  }
}
