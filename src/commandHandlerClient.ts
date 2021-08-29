import { Client, Collection, Message } from "discord.js";
import * as fs from "fs";

class commandHandlerClient extends Client {
  prefix: string;
  constructor(options: any) {
    super(options);
    this.prefix = options.prefix;
  }

  public commands = new Collection();

  async loadCommandOnFile(path: string, fileExtensions: string) {
    const commandFiles = fs
      .readdirSync(path)
      .filter((file) => file.endsWith(`.${fileExtensions}`));

    for (const file of commandFiles) {
      const command = require(`${path}/${file}`);
      this.commands.set(command.name, command);
    }
  }

  async loadCommandOnFolder(path: string, fileExtensions: string) {
    const commandFolders = fs.readdirSync(path);

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(`.${fileExtensions}`));
      for (const file of commandFiles) {
        const command = require(`${path}/${folder}/${file}`);
        this.commands.set(command.name, command);
      }
    }
  }

  async commandHandler(msg: Message, client: any) {
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
  }
}

export { commandHandlerClient };
