const { Listener } = require('../..')

module.exports = class extends Listener {
  constructor() {
    super()
    this.name = 'ready'
  }
  execute() {
    console.log('test')
  }
}
