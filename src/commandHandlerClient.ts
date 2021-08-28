import { Client, Collection } from "discord.js";
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
}

export { commandHandlerClient };
