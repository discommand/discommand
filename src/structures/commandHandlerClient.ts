import { Client, Collection, Interaction, Message } from "discord.js";
import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

export class commandHandlerClient extends Client {
  prefix: string;
  path!: string;
  endsWith!: string;
  constructor(options: any) {
    super(options);
    this.prefix = options.prefix;
    this.path = options.path;
    this.endsWith = options.endsWith;
    this.token = options.token;
  }

  public commands = new Collection();

  public slash = new Collection();

  public async loadCommandWithFile() {
    const commandFiles = readdirSync(this.path).filter((file) =>
      file.endsWith(`.${this.endsWith}`)
    );

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      this.commands.set(Command.name, Command);
    }
  }

  public async loadCommandWithFolder() {
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

  public async loadSlashGuildCmdWithFile(clientId: string, guildId: string) {
    const commandFiles = readdirSync(this.path).filter((file) =>
      file.endsWith(`.${this.endsWith}`)
    );

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      this.slash.set(Command.data.name, Command);
    }
    this.registryGuildSlashWithFile(clientId, guildId);
  }

  public async runMessage(msg: Message, client: commandHandlerClient) {
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

  public async runSlash(
    interaction: Interaction,
    client: commandHandlerClient
  ) {
    if (!interaction.isCommand()) return;

    const command: any = this.slash.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
    }
  }

  private async registryGuildSlashWithFile(clientId: string, guildId: string) {
    const rest = new REST({ version: "9" }).setToken(`${this.token}`);
    const commands = [];
    const commandFiles = readdirSync(this.path).filter((file) =>
      file.endsWith(`.${this.endsWith}`)
    );

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      commands.push(Command.data.toJSON());
    }

    (async () => {
      try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: commands,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
