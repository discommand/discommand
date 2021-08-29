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
});

client.loadCommandOnFile(__dirname + "/commands", "ts"); // else client.loadCommandOnFolder(__dirname + "/commands", "ts");

client.on("messageCreate", (msg) => {
  client.commandHandler(msg, client);
});

client.login("your_bot_token");
```

commands/ping.ts

```ts
export = {
  name: "ping",
  execute(client: any, msg: any, args: any) {
    msg.reply("pong!");
  },
};
```

and

```ts
import type { Message } from "discord.js";

export = {
  name: "ping",
  execute(client: any, msg: Message, args: any) {
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
});

client.loadCommandOnFile(__dirname + "/commands", "js"); // else client.loadCommandOnFolder(__dirname + "/commands", "js");

client.on("messageCreate", (msg) => {
  client.commandHandler(msg, client);
});

client.login("your_bot_token");
```

commands/ping.js

```js
module.exports = {
  name: "ping",
  execute(client, msg, args) {
    msg.reply("pong!");
  },
};
```
