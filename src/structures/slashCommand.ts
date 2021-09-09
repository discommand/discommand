import { CommandInteraction, Client } from "discord.js";

interface commandOptions {
  data: any;
}

export class slashCommand implements commandOptions {
  data: any;
  execute(interaction: CommandInteraction, client: Client): any {}
}
