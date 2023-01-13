const { Listener } = require('../..')

module.exports = class extends Listener {
  constructor() {
    super('ready')
  }
  execute() {
    console.log('test')
  }
}
