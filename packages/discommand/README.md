# discommand

[![](https://img.shields.io/npm/v/discommand)](https://npmjs.com/package/discommand)
![](https://img.shields.io/node/v/discommand)
![](https://img.shields.io/npm/dm/discommand)

easy discord.js commandHandler

## Installation

- **alert! this is using ES Module. If you're using TypeScript, 4.7 or higher. [See this document for details.](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)**
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

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: __dirname + '/commands',
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

const client = new DiscommandClient(
  {
    intents: [GatewayIntentBits.Guilds],
  },
  {
    directory: {
      command: __dirname + '/commands',
    },
  }
)

client.login('your_bot_token')
```

commands/ping.js

```js
import { Command } from 'discommand'
import { ApplicationCommandType } from 'discord.js'

module.exports = class extends Command {
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
