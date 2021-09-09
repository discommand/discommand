import { Client, Collection } from "discord.js";

type loadType = "FOLDER" | "FILE";
type slashType = "GUILD" | "GLOBAL";

export class Command implements CommandOptions {
  /**
   * @property {Client} [client] Discord.js Client
   * @property {string} [prefix] bot's prefix
   * @property {string} [path] commndFile's path
   * @property {loadType} [loadType] command load type
   * @property {boolean} [slash] slash on/off
   * @property {slashType} [slashType] slash type ("GUILD", "GLOBAL") [optional]
   * @property {string} [token] bot's token [optional]
   */
  client: Client;
  prefix: string;
  path: string;
  loadType: loadType;
  slash: boolean;
  slashType?: slashType;
  token?: string;
  constructor(client: Client, options: CommandOptions) {
    this.client = client;
    this.prefix = options.prefix;
    this.path = options.path;
    this.loadType = options.loadType;
    this.slash = options.slash;
    this.slashType = options.slashType;
    this.token = options.token;
  }

  public commands = new Collection();

  public version = require("../../package.json").version;
}

interface CommandOptions {
  path: string;
  prefix: string;
  loadType: loadType;
  slash: boolean;
  slashType?: slashType;
  token?: string;
}
