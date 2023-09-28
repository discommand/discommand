import { DiscommandClient } from '../discommandClient.js'

export abstract class BasePlugin {
  public start(client: DiscommandClient) {
    return this
  }
}
