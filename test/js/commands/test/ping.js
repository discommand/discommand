const { MessageCommand } = require('../../../../dist/index.js')

module.exports = class extends MessageCommand {
  name = 'ping'
  execute(msg, args, cmd) {
    msg.reply('pong!')
  }
}
