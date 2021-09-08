import { Client, Collection, Interaction, Message } from "discord.js";
import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

export class commandHandlerClient extends Client {
  prefix!: string;
  path!: string;
  constructor(options: any) {
    super(options);
    this.prefix = options.prefix;
    this.path = options.path;
    this.token = options.token;
  }

  public commands = new Collection();

  public async loadCommandWithFile() {
    const commandFiles = readdirSync(this.path);
    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      this.commands.set(Command.name, Command);
      console.log(`${Command.name} load`);
    }
  }

  public async loadCommandWithFolder() {
    const commandFolders = readdirSync(this.path);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${this.path}/${folder}`);
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${folder}/${file}`);
        const Command = new command();
        this.commands.set(Command.name, Command);
        console.log(`${Command.name} load`);
      }
    }
  }

  public async loadSlashGuildCmdWithFile(clientId: string, guildId: string) {
    const commandFiles = readdirSync(this.path);

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      this.commands.set(Command.data.name, Command);
      console.log(`${Command.data.name} load`);
    }
    this.registryGuildSlashWithFile(clientId, guildId);
  }

  public async loadSlashCmdWithFile(clientId: string) {
    const commandFiles = readdirSync(this.path);

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      this.commands.set(Command.data.name, Command);
      console.log(`${Command.data.name} load`);
    }
    this.registrySlashWithFile(clientId);
  }

  public async runMessage(msg: Message, client: commandHandlerClient) {
    const prefix = this.prefix || "!";
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args: string[] = msg.content.slice(prefix.length).trim().split(/ +/);
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

  public async loadSlashGuildCmdWithFolder(clientId: string, guildId: string) {
    const commandFolders = readdirSync(this.path);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${this.path}/${folder}`);
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${folder}/${file}`);
        const Command = new command();
        this.commands.set(Command.data.name, Command);
        console.log(`${Command.data.name} load`);
      }
    }
    this.registryGuildSlashWithFolder(clientId, guildId);
  }

  public async runSlash(
    interaction: Interaction,
    client: commandHandlerClient
  ) {
    if (!interaction.isCommand()) return;

    const command: any = this.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
    }
  }

  public loadSlashCmdWithFolder(clientId: string) {
    const commandFolders = readdirSync(this.path);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${this.path}/${folder}`);
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${folder}/${file}`);
        const Command = new command();
        this.commands.set(Command.data.name, Command);
        console.log(`${Command.data.name} load`);
      }
    }
    this.registrySlashWithFolder(clientId);
  }

  private async registryGuildSlashWithFile(clientId: string, guildId: string) {
    const rest = new REST({ version: "9" }).setToken(`${this.token}`);
    const commands = [];
    const commandFiles = readdirSync(this.path);

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

  private async registrySlashWithFile(clientId: string) {
    const rest = new REST({ version: "9" }).setToken(`${this.token}`);
    const commands = [];
    const commandFiles = readdirSync(this.path);

    for (const file of commandFiles) {
      const { command } = require(`${this.path}/${file}`);
      const Command = new command();
      commands.push(Command.data.toJSON());
    }

    (async () => {
      try {
        await rest.put(Routes.applicationCommands(clientId), {
          body: commands,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }

  private async registryGuildSlashWithFolder(
    clientId: string,
    guildId: string
  ) {
    const rest = new REST({ version: "9" }).setToken(`${this.token}`);
    const commands = [];
    const commandFolders = readdirSync(this.path);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${this.path}/${folder}`);
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${folder}/${file}`);
        const Command = new command();
        commands.push(Command.data.toJSON());
      }
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

  private async registrySlashWithFolder(clientId: string) {
    const rest = new REST({ version: "9" }).setToken(`${this.token}`);
    const commands = [];
    const commandFolders = readdirSync(this.path);

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`${this.path}/${folder}`);
      for (const file of commandFiles) {
        const { command } = require(`${this.path}/${folder}/${file}`);
        const Command = new command();
        commands.push(Command.data.toJSON());
      }
    }

    (async () => {
      try {
        await rest.put(Routes.applicationCommands(clientId), {
          body: commands,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
