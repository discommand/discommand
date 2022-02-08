# discommand

easy discord.js commandHandler

## Installation

- this is for discord.js@13

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
import { CommandHandler } from 'discommand'
import path = require('path')

const client = new Client({intents: ['GUILDS']})
const cmd = new CommandHandler(client, {
    path: path.join(__dirname, 'commands'),
    loadType: 'FILE',
})

cmd.CommandLoadAll()

client.login('your_bot_token')
```

commands/ping.ts

```ts
import { Command, CommandHandler } from 'discommand'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends Command {
  data = new SlashCommandBuilder().setName('Ping').setDescription('Pong!')
  execute(interaction: CommandInteraction, slash: CommandHandler) {
    interaction.reply('Pong!')
  }
}
```

### Usage for Javascript

index.js

```js
const { Client } = require('discord.js')
const { CommandHandler } = require('discommand')
const path = require('path')

const client = new Client({ intents: ['GUILDS'] })

const cmd = new CommandHandler(client, {
  prefix: '!',
  path: path.join(__dirname, 'commands'),
  loadType: 'FOLDER',
})

cmd.CommandLoadAll()

client.login('your_bot_token')
```

commands/ping.js

```js
const { Command } = require('discommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class extends Command {
  data = new SlashCommandBuilder().setName('ping').setDescription('Pong!')
  execute(interaction, slash) {
    interaction.reply('Pong!')
  }
}
```
