# discommand-lite

discommand, but Command Handler only

## Installation

- this is use for discord.js@14
- **Required by node.js 16.9.0 or higher**

1. Stable version

```sh
npm i @discommand/lite
```

2. Development version

```sh
npm i @discommand/lite@next
```

## Example

### Usage for TypeScript

index.ts

```ts
import { CommandHandler, LoadType } from '@discommand/lite'
import { Client, GatewayIntentBits } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const cmd = new CommandHandler(client, {
  loadType: LoadType.File,
  directory: __dirname + '/commands',
})

cmd.loadAll()
client.login('your_bot_token')
```

commands/ping.ts

```ts
import { Command } from '@discommand/lite'
import { ChatInputCommandInteraction } from 'discord.js'

export default class extends Command {
  name = 'ping'
  description = 'pong'
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong!')
  }
}
```

### Usage for Javascript

index.js

```js
const { CommandHandler, LoadType } = require('@discommand/lite')
const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const cmd = new CommandHandler(client, {
  loadType: LoadType.File,
  directory: __dirname + 'commands',
})

cmd.loadAll()
client.login('your_bot_token')
```

commands/ping.js

```js
const { Command } = require('@discommand/lite')

module.exports = class extends Command {
  name = 'ping'
  description = 'pong'
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
```
