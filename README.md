# discord.js-commandhandler

easy discord.js commandHandler

## Installation

this is use discord.js@13

```sh
npm i @migan/discord.js-commandhandler
```

## Example

### ts

index.ts

```ts
import { commandHandlerClient } from "@migan/discord.js-commandhandler";
import { Intents } from "discord.js";

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
  path: __dirname + "/commands",
  endsWith: "ts",
});

client.loadCommandWithFile(); // else client.loadCommandWithFolder();

client.on("messageCreate", (msg) => {
  client.run(msg, client);
});

client.login("your_bot_token");
```

commands/ping.ts

```ts
import type { Message } from "discord.js";
import { Command, commandHandlerClient } from '@migan/discord.js-commandhandler';

export class command extends Command {
  name: "ping",
  execute(msg: Message, client: commandHandlerClient, args: any) {
    msg.reply("pong!");
  },
};
```

### js

index.js

```js
const { commandHandlerClient } = require("@migan/discord.js-commandhandler");
const { Intents } = require("discord.js");

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
  path: __dirname + "/commands",
  endsWith: "js",
});

client.loadCommandWithFile(); // else client.loadCommandWithFolder();

client.on("messageCreate", (msg) => {
  client.run(msg, client);
});

client.login("your_bot_token");
```

commands/ping.js

```js
const { Command } = require("@migan/discord.js-commandhandler");

exports.command = class command extends Command {
  name = "ping";
  execute(msg, client, args) {
    msg.reply("pong!");
  }
};
```
