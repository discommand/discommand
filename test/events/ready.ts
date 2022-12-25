import { Listener } from '../../dist'

// @ts-ignore
export = class extends Listener {
  name = 'ready'
  execute(): any {
    console.log('test')
  }
}
