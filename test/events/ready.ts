import { Listener } from '../../dist'

export default class extends Listener {
  constructor() {
    super()
    this.name = 'ready'
  }
  execute() {
    console.log('test')
  }
}
