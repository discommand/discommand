const { commandHandlerClient } = require('../dist/commandHandlerClient.js');
const { Intents } = require('discord.js');
const config = require('./config.json');

const client = new commandHandlerClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    prefix: "!",
});

client.loadCommandOnFile(__dirname + '/commands', 'js');

client.on("messageCreate", (msg) => {
    client.commandHandler(msg, client);
});

client.login(config.token);