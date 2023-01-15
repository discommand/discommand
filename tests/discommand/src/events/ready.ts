import { Listener } from 'discommand'

export default class extends Listener {
  constructor() {
    super('ready')
  }
  execute() {
    console.log('test')
  }
}
