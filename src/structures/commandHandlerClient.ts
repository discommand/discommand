import { Client, Collection, Message } from "discord.js";
import { readdirSync } from "fs";

export class commandHandlerClient extends Client {
  prefix: string;
  path!: string;
  endsWith!: string;
  constructor(options: any) {
    super(options);
    this.prefix = options.prefix;
    this.path = options.path;
    this.endsWith = options.endsWith;
  }

  public commands = new Collection();

  async loadCommandWithFile() {
    const commandFiles = readdirSync(this.path).filter((file) =>
      file.endsWith(`.${this.endsWith}`)
    );

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      this.commands.set(Command.name, Command);
    }
  }

  async loadCommandWithFolder() {
    const commandFolders = readdirSync(this.path);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${this.path}/${folder}`).filter(
        (file) => file.endsWith(`.${this.endsWith}`)
      );
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${file}`);
        const Command = new command();
        this.commands.set(Command.name, Command);
      }
    }
  }

  async run(msg: Message, client: any) {
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
      command.execute(msg, client, args);
    } catch (error) {
      console.error(error);
    }
    if (!client.commands.has(commandName)) return;
  }
}
