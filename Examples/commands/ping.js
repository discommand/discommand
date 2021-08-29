const { Command } = require('../../dist/index.js');

exports.command = class command extends Command {
    name = "ping";
    execute(msg, client, args) {
        msg.reply("pong!");
    };
}