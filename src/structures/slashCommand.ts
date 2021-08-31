import { Interaction } from "discord.js";
import { commandHandlerClient } from "../index";

interface commandOptions {
  data: any;
}

export class slashCommand implements commandOptions {
  data: any;
  execute(interaction: Interaction, client: commandHandlerClient): any {}
}
