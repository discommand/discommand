import { commandHandlerClient } from "../dist/index.js";
import { Intents } from "discord.js";

const config = require("./config.json");

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
  path: __dirname + "/commands",
  endsWith: "ts",
  token: config.token,
});

client.loadSlashGuildCmdWithFile("863380982560456704", "863380858681557003");

client.on("interactionCreate", (interaction) => {
  client.runSlash(interaction, client);
});

client.login();
