import { MessageComponent } from '@discommand/message-components'
import { ButtonInteraction } from 'discord.js'

export default class extends MessageComponent {
  constructor() {
    super('a')
  }
  execute(interaction: ButtonInteraction) {
    interaction.update({
      content: 'test',
      components: [],
    })
  }
}
