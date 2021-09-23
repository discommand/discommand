# discord.js-commandhandler

easy discord.js commandHandler

- Caution! This version is under development. Accordingly, there may be a bug.

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
import { Client, Intents } from 'discord.js'
import { Command } from '@migan/discord.js-commandhandler'
import path = require('path')

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  slash: false,
  loadType: 'FILE',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import type { Message } from 'discord.js'
import {
  MessageCommand,
  commandHandlerClient,
} from '@migan/discord.js-commandhandler'

export class command extends MessageCommand {
  name = 'ping'
  execute(msg: Message, client: commandHandlerClient, args: any) {
    msg.reply('pong!')
  }
}
```

#### slashCommand

index.ts

```ts
import { Client, Intents } from 'discord.js'
import { Command } from '@migan/discord.js-commandhandler'
import path = require('path')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  slash: true,
  loadType: 'FILE',
  slashType: 'GUILD',
  token: 'your_bot_token',
  guildId: 'GuildId',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import {
  slashCommand,
  commandHandlerClient,
} from '@migan/discord.js-commandhandler'

export class command extends slashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('pong')
  async execute(interaction: CommandInteraction, client: commandHandlerClient) {
    await interaction.reply('pong!')
  }
}
```

### js

#### MessageCommand

index.js

```js
const { Client, Intents } = require('discord.js')
const { Command } = require('@migan/discord.js-commandhandler')
const path = require('path')
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  slash: false,
  loadType: 'FILE',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.js

```js
const { MessageCommand } = require('@migan/discord.js-commandhandler')

exports.command = class command extends MessageCommand {
  name = 'ping'
  execute(msg, client, args) {
    msg.reply('pong!')
  }
}
```

#### slashCommand

index.js

```js
const { Client, Intents } = require('discord.js')
const { Command } = require('@migan/discord.js-commandhandler')
const path = require('path')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  slash: true,
  loadType: 'FILE',
  slashType: 'GUILD',
  token: 'your_bot_token',
  guildId: 'GuildId',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.js

```js
const { SlashCommandBuilder } = require('@discordjs/builders')
const { slashCommand } = require('@migan/discord.js-commandhandler')

exports.command = class command extends slashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('pong')
  execute(interaction, client) {
    interaction.reply('pong!')
  }
}
```
