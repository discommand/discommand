# discord.js-commandhandler

easy discord.js commandHandler

## Installation

this is use discord.js@13

```sh
npm i @migan/discord.js-commandhandler
```

dev

```sh
npm i @migan/discord.js-commandhandler@next
```

## Example

### ts

#### MessageCommand

index.ts

```ts
import { commandHandlerClient } from "@migan/discord.js-commandhandler";
import { Intents } from "discord.js";

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
  path: __dirname + "/commands",
  token: "your_bot_token",
});

client.loadCommandWithFile(); // else client.loadCommandWithFolder();

client.on("messageCreate", (msg) => {
  client.runMessage(msg, client);
});

client.login();
```

commands/ping.ts

```ts
import type { Message } from "discord.js";
import {
  MessageCommand,
  commandHandlerClient,
} from "@migan/discord.js-commandhandler";

export class command extends MessageCommand {
  name = "ping";
  execute(msg: Message, client: commandHandlerClient, args: any) {
    msg.reply("pong!");
  }
}
```

#### slashCommand

index.ts

```ts
import { commandHandlerClient } from "@migan/discord.js-commandhandler";
import { Intents } from "discord.js";

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS],
  prefix: "!",
  path: __dirname + "/commands",
  token: "your_bot_token",
});

client.loadSlashGuildCmdWithFile(clientId, guildId);

client.on("interactionCreate", (interaction) => {
  client.runSlash(interaction, client);
});

client.login();
```

commands/ping.ts

```ts
import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import {
  slashCommand,
  commandHandlerClient,
} from "@migan/discord.js-commandhandler";

export class command extends slashCommand {
  data = new SlashCommandBuilder().setName("ping").setDescription("pong");
  async execute(interaction: CommandInteraction, client: commandHandlerClient) {
    await interaction.reply("pong!");
  }
}
```

### js

#### MessageCommand

index.js

```js
const { commandHandlerClient } = require("@migan/discord.js-commandhandler");
const { Intents } = require("discord.js");

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  prefix: "!",
  path: __dirname + "/commands",
  token: "your_bot_token",
});

client.loadCommandWithFile(); // else client.loadCommandWithFolder();

client.on("messageCreate", (msg) => {
  client.runMessage(msg, client);
});

client.login();
```

commands/ping.js

```js
const { MessageCommand } = require("@migan/discord.js-commandhandler");

exports.command = class command extends MessageCommand {
  name = "ping";
  execute(msg, client, args) {
    msg.reply("pong!");
  }
};
```

#### slashCommand

index.js

```js
const { commandHandlerClient } = require("@migan/discord.js-commandhandler");
const { Intents } = require("discord.js");

const client = new commandHandlerClient({
  intents: [Intents.FLAGS.GUILDS],
  prefix: "!",
  path: __dirname + "/commands",
  token: "your_bot_token",
});

client.loadSlashGuildCmdWithFile(clientId, guildId);

client.on("interactionCreate", (interaction) => {
  client.runSlash(interaction, client);
});

client.login();
```

commands/ping.js

```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { slashCommand } = require("@migan/discord.js-commandhandler");

exports.command = class command extends slashCommand {
  data = new SlashCommandBuilder().setName("ping").setDescription("pong");
  execute(interaction, client) {
    interaction.reply("pong!");
  }
};
```
