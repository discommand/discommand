import type { Message } from "discord.js";
import { Command, commandHandlerClient } from "../../dist/index.js";

export class command extends Command {
  name = "ping";
  execute(msg: Message, client: commandHandlerClient, args: any) {
    msg.reply("pong!");
  }
}
