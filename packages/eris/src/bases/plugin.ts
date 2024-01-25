import type { DiscommandClient } from '../client.js'

export abstract class BasePlugin {
  public start(client: DiscommandClient) {
    return this
  }
}
