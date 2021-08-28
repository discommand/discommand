import { commandHandlerClient } from "../dist/commandHandlerClient.js";
import { Intents } from "discord.js";

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
});

client.loadCommandOnFile(__dirname + "/commands", "ts");

client.on("messageCreate", (msg) => {
  if (!msg.content.startsWith(client.prefix) || msg.author.bot) return;

  const args: string[] = msg.content
    .slice(client.prefix.length)
    .trim()
    .split(/ +/);
  const shift: any = args.shift();
  const commandName = shift.toLowerCase();

  const command: any =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
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
