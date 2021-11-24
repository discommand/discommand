# discommand

easy discord.js commandHandler

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

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { Message } from 'discord.js'
import { MessageCommand, Command } from 'discommand'

export = class extends MessageCommand {
  name = 'ping'
  execute(msg: Message, args: string[], cmd: Command) {
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

client.login('your_bot_token')
```

commands/ping.js

```js
const { MessageCommand } = require('discommand')

module.exports = class extends MessageCommand {
  name = 'ping'
  execute(msg, args, cmd) {
    msg.reply('pong!')
  }
}
```
