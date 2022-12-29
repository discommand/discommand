const { Command } = require('../..')

module.exports = class DeloadCommands extends Command {
  constructor() {
    super('deload')
    /**
     * @type {import('discord.js').ApplicationCommandData}
     */
    this.data = {
      name: 'deload',
      description: 'deload',
    }
  }
  execute(interaction) {
    interaction.client.deloadAll()
  }
}
