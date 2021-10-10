const { MessageCommand } = require('../../../../dist/index.js')

module.exports = class extends MessageCommand {
  name = ''
  execute(msg, args) {
    msg.reply('pong!')
  }
}
