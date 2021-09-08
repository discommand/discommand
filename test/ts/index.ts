import { commandHandlerClient } from "../../dist/index.js";
import { Intents } from "discord.js";
import path = require("path");

const config = require("../config.json");

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  // path: path.join(__dirname, "commands"),
  path: 1,
  token: config.token,
});

client.loadSlashGuildCmdWithFolder("863380982560456704", "863380858681557003");

client.on("interactionCreate", (interaction) => {
  client.runSlash(interaction, client);
});

client.login();
