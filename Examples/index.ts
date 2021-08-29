import { commandHandlerClient } from "../dist/commandHandlerClient.js";
import { Intents } from "discord.js";
const config = require("./config.json");

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
});

client.loadCommandOnFile(__dirname + "/commands", "ts");

client.on("messageCreate", (msg) => {
  client.commandHandler(msg, client);
});

client.login(config.token);
