import { Listener } from '../../dist'

export = class extends Listener {
  name = 'ready'
  execute(): any {
    console.log('test')
  }
}
