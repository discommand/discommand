const { MessageComponent } = require('../..')

module.exports = class extends MessageComponent {
  constructor() {
    super('a')
  }
  execute(interaction) {
    interaction.update({ content: 'test', components: [] })
  }
}
