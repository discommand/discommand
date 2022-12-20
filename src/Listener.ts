import { Base } from './Base'

/**
 * @abstract
 */
export abstract class Listener extends Base {
  public once: boolean = false
}
