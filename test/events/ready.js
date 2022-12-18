const { Listener } = require('../../dist')

module.exports = class extends Listener {
  constructor() {
    super()
    this.name = 'ready'
  }
  execute() {
    console.log('test')
  }
}
