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

- **※ This example is Slash Command.**

### Usage for TypeScript

index.ts

```ts
import { Client } from 'discord.js'
import { Command } from 'discommand'
import path = require('path')

const client = new Client({ intents: ['GUILDS'] })
const cmd = new Command(client, {
  path: path.join(__dirname, 'commands'),
  loadType: 'FILE',
})

cmd.loadCommand()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { SlashCommand, Command } from 'discommand'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('Ping').setDescription('Pong!')
  execute(interaction: CommandInteraction, slash: Command) {
    interaction.reply('Pong!')
  }
}
```

### Usage for Javascript

index.js

```js
const { Client } = require('discord.js')
const { Command } = require('../../dist')
const path = require('path')

const client = new Client({ intents: ['GUILDS'] })

const cmd = new Command(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  loadType: 'FOLDER',
})

cmd.loadCommand()

client.login('your_bot_token')
```

commands/ping.js

```js
const { SlashCommand, Command } = require('discommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends SlashCommand {
  data = new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  execute(interaction, slash) {
    interaction.reply('Pong!')
  }
}
```
