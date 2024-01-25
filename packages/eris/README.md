# discommand-eris

discommand for eris.

- This is Pure ES Module.
- Required by Node.js 10.4.0 or higher.

1. Stable version

```shell
npm i @discommand/eris
```

2. Development version

```shell
npm i @discommand/eris@next
```

## Example

index.js

```js
import { DiscommandClient } from '@discommand/eris'
import { Constants } from 'eris'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const client = new DiscommandClient(
  'your_bot_token',
  {
    intents: [Constants.Intents.guilds],
  },
  {
    directory: {
      command: dirname(fileURLToPath(import.meta.url)) + '/commands',
    },
  },
)

client.connect()
```

commands/ping.js

```js
import { Command } from '@discommand/eris'

export default class extends Command {
  constructor() {
    super({
      name: 'ping',
      description: 'Pong',
    })
  }
  execute(interaction) {
    interaction.createMessage('Pong!')
  }
}
```
