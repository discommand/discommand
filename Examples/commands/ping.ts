import type { Message } from "discord.js";

export = {
  name: "ping",
  execute(client: any, msg: Message, args: any) {
    msg.reply("pong!");
  },
};
