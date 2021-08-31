import { Message } from "discord.js";
import { commandHandlerClient } from "../index";

interface commandOptions {
  name: string;
  description?: string;
  aliases?: string[];
}

export class MessageCommand implements commandOptions {
  name: string = "";
  description?: string = "";
  aliases?: string[] = [""];
  execute(msg: Message, client: commandHandlerClient, args: any): any {}
}
