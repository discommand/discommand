# @discommand/message-components

## Using

- stable version

```shell
npm i @discommand/message-components
```

- development version

```shell
npm i @discommand/message-components@next
```

---

```js
const { ComponentHandler } = require('@discommand/message-components')
// ...
const handler = new ComponentHandler(client, {
  directory: __dirname + '/components',
})

handler.loadAll()
// ...
```

components/select.js

```js
const { MessageComponents } = require('@discommand/message-components')

module.exports = class extends MessageComponents {
  constructor() {
    super('foo')
  }
  execute(interaction) {
    interaction.update({ content: 'bar', components: [] })
  }
}
```
