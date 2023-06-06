# discommand

[![](https://img.shields.io/npm/v/discommand)](https://npmjs.com/package/discommand)
![](https://img.shields.io/node/v/discommand)
![](https://img.shields.io/npm/dm/discommand)

easy discord.js commandHandler

## Installation

- **alert! this is Pure ES Module.**
- this is use for discord.js@14
- **Required by node.js 16.9.0 or higher**

1. Stable version

```sh
npm i discommand
```

2. Development version

```sh
npm i discommand@next
```

## Example

### Usage for TypeScript

index.ts

```ts
import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: dirname(fileURLToPath(import.meta.url)) + '/commands',
    },
  }
)

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { Command } from 'discommand'
import { ChatInputCommandInteraction, ApplicationCommandType } from 'discord.js'

export default class extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Pong',
      type: ApplicationCommandType.ChatInput,
    })
  }

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong!')
  }
}
```

### Usage for Javascript

index.js

```js
import { DiscommandClient } from 'discommand'
import { GatewayIntentBits } from 'discord.js'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: dirname(fileURLToPath(import.meta.url)) + '/commands',
    },
  }
)

client.login('your_bot_token')
```

commands/ping.js

```js
import { Command } from 'discommand'
import { ApplicationCommandType } from 'discord.js'

export default class extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Pong',
      type: ApplicationCommandType.ChatInput,
    })
  }
  execute(interaction) {
    interaction.reply('Pong!')
  }
}
```
