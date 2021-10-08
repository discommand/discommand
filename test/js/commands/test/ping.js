const { MessageCommand } = require('../../../../dist/index.js')

exports.command = class command extends MessageCommand {
  name = 'ping'
  execute(msg, args) {
    msg.reply('pong!')
  }
}
