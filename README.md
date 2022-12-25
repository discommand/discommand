# discommand

easy discord.js commandHandler

- **This version is not supported by MessageCommand.**
- **This version will only include bug fixes in the future, and new features will not be updated.**

## Installation

- this is for discord.js@13

```sh
npm i discommand@djsv13
```

## Example

- **※ This example is Slash Command.**

### Usage for TypeScript

index.ts

```ts
import { DiscommandClient } from 'discommand'
import { Intents } from 'discord.js'
import path = require('path')

const client = new DiscommandClient(
  {
    intents: [Intents.FLAGS.GUILDS],
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
import { CommandInteraction } from 'discord.js'

export = class extends Command {
  name = 'ping'
  description = 'ping'
  execute(
    interaction: CommandInteraction,
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
    intents: [Intents.FLAGS.GUILDS],
  },
  {
    loadType: 'FILE',
    CommandHandlerDirectory: path.join(__dirname, 'commands'),
  }
)

client.loadAll()

client.login('your_bot_token')
```

commands/ping.js

```js
const { Command } = require('discommand')

export = class extends Command {
  name = 'ping'
  description = 'ping'
  execute(interaction, DiscommandHandler) {
    interaction.reply('Pong!')
  }
}
```
