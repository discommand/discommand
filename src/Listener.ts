import { ModuleTypeString } from '.'
import { Base } from './Base'

/**
 * @abstract
 */
export abstract class Listener extends Base {
  public once: boolean = false
  /**
   * @readonly
   */
  public readonly type: ModuleTypeString = 'Listener'
}
