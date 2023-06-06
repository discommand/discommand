# @discommand/message-components

discommand plugin.

## Using

alert! this is Pure ES Module.

- stable version

```shell
npm i @discommand/message-components discommand
```

- development version

```shell
npm i @discommand/message-components@next discommand
```

---

```js
import { ComponentPlugin } from '@discommand/message-components'
import { DiscommandClient } from 'discommand'

const client = new DiscommandClient(
  {
    // ...
  },
  {
    // ...
    plugins: [
      new ComponentPlugin({
        directory: 'your_component_directory',
      }),
    ],
  }
)

client.login('your_token')
```

components/select.js

```js
import { MessageComponents } from '@discommand/message-components'

export default class extends MessageComponents {
  constructor() {
    super('foo')
  }

  execute(interaction) {
    interaction.update({ content: 'bar', components: [] })
  }
}
```
