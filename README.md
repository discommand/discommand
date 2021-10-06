# discommand

easy discord.js commandHandler

- Caution! This version is under development, so there may be a bug.

## Installation

this is for discord.js@13

```sh
npm i discommand
```

dev

```sh
npm i discommand@next
```

## Example

### Usage for TypeScript

#### MessageCommand

index.ts

```ts
import { Client, Intents } from 'discord.js'
import { Command } from 'discommand'
import path = require('path')

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  loadType: 'FILE',
})

cmd.loadCommand()

cmd.run()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import type { Message } from 'discord.js'
import { MessageCommand, commandHandlerClient } from 'discommand'

export class command extends MessageCommand {
  name = 'ping'
  execute(msg: Message, client: commandHandlerClient, args: any) {
    msg.reply('pong!')
  }
}
```

### Usage for Javascript

#### MessageCommand

index.js

```js
const { Client, Intents } = require('discord.js')
const { Command } = require('discommand')
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
const { MessageCommand } = require('discommand')

exports.command = class command extends MessageCommand {
  name = 'ping'
  execute(msg, client, args) {
    msg.reply('pong!')
  }
}
```
