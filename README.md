# discommand

easy discord.js commandHandler

- **This version is not supported localizations.**

## Installation

- this is use for discord.js@14
- **Required by node.js 16.9.0 or higher**

```sh
npm i discommand
```

dev

```sh
npm i discommand@next
```

## Example

### Usage for TypeScript

index.ts

```ts
import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import * as path from 'path'

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: 'FILE',
    CommandHandlerDirectory: path.join(__dirname, 'commands'),
  }
)

client.loadAll()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { Command } from 'discommand'
import { ChatInputCommandInteraction } from 'discord.js'

export = class extends Command {
  name = 'ping'
  description = 'ping'
  execute(
    interaction: ChatInputCommandInteraction,
    DiscommandHandler: DiscommandHandler
  ) {
    interaction.reply('Pong!')
  }
}
```

### Usage for Javascript

index.js

```js
const { DiscommndClient } = require('discommand')
const { Intents } = require('discord.js')
const path = require('path')

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: 'FILE',
    CommandHandlerDirectory: path.join(__dirname, 'commands'),
  }
)

client.LoadAll()

client.login('your_bot_token')
```

commands/ping.js

```js
const { Command } = require('discommand')

module.exports = class extends Command {
  name = 'ping'
  description = 'ping'
  execute(interaction, DiscommandHandler) {
    interaction.reply('Pong!')
  }
}
```
