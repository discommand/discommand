import { Client, Collection } from "discord.js";

type loadType = "FOLDER" | "FILE";
type slashType = "GUILD" | "GLOBAL";

export class Command implements CommandOptions {
  /**
   * @param {Client} [client] Discord.js Client
   * @param {string} [prefix] bot's prefix
   * @param {string} [path] commndFile's path
   * @param {loadType} [loadType] command load type
   * @param {boolean} [slash] slash on/off
   * @param {slashType} [slashType] slash type ("GUILD", "GLOBAL") [optional]
   * @param {string} [token] bot's token [optional]
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
