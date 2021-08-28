const { commandHandlerClient } = require('../dist/commandHandlerClient.js');
const { Intents } = require('discord.js');

const client = new commandHandlerClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    prefix: "!",
});

client.loadCommandOnFile(__dirname + '/commands', 'js');

client.on("messageCreate", (msg) => {
    if (!msg.content.startsWith(client.prefix) || msg.author.bot) return;

    const args = msg.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;

    try {
        command.execute(client, msg, args);
    } catch (error) {
        console.error(error);
    }
    if (!client.commands.has(commandName)) return;
});

client.login("your_bot_token");