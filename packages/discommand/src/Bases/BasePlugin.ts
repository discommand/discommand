import { DiscommandClient } from '../DiscommandClient.js'

export abstract class BasePlugin {
  public start(client: DiscommandClient) {
    return this
  }
}
