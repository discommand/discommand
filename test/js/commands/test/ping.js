const { SlashCommandBuilder } = require('@discordjs/builders')
const { slashCommand } = require('../../../../dist/index.js')

exports.command = class command extends slashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('pong')
  execute(interaction, client) {
    interaction.reply('pong!')
  }
}
