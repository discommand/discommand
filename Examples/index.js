const { commandHandlerClient } = require('../dist/index.js');
const { Intents } = require('discord.js');
const config = require('./config.json');

const client = new commandHandlerClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    prefix: "!",
    path: __dirname + '/commands',
    endsWith: 'js'
});

client.loadCommandWithFile();

client.on("messageCreate", (msg) => {
    client.run(msg, client);
});

client.login(config.token);