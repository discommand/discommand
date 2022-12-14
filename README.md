# discommand

easy discord.js commandHandler

- **This version is not supported localizations.**

## Installation

- this is use for discord.js@14
- **Required by node.js 16.9.0 or higher**

1. Stable version

```sh
npm i discommand
```

2. Devlopment version

```sh
npm i discommand@next
```

## Example

### Usage for TypeScript

index.ts

```ts
import { DiscommandClient, LoadType } from 'discommand'
import { GatewayIntentBits } from 'discord.js'

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: LoadType.File,
    directory: {
      commandFolderDirectory: __dirname + '/commands',
    },
  }
)

client.loadAll()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { Command } from 'discommand'
import { ChatInputCommandInteraction } from 'discord.js'

export default class extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'Pong'
  }
  execute(interaction: ChatInputCommandInteraction, cmd: DiscommandHandler) {
    interaction.reply('Pong!')
  }
}
```

### Usage for Javascript

index.js

```js
const { DiscommndClient, LoadType } = require('discommand')
const { GatewayIntentBits } = require('discord.js')
const path = require('path')

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    loadType: LoadType.File,
    directory: {
      commandFolderDirectory: __dirname + '/commands',
    },
  }
)

client.loadAll()

client.login('your_bot_token')
```

commands/ping.js

```js
const { Command } = require('discommand')
const { SlashCommandBuilder } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super()
    this.name = 'ping'
    this.description = 'Pong!'
  }
  execute(interaction, cmd) {
    interaction.reply('Pong!')
  }
}
```
