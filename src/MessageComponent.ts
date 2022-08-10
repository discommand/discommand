import { MessageComponentInteraction } from 'discord.js'
import { MessageComponentType } from '.'

export abstract class MessageComponent {
  name: string = ''
  type: MessageComponentType = MessageComponentType.Button
  execute(interaction: MessageComponentInteraction): void {}
}
