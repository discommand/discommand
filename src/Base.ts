/**
 * @abstract
 */
export abstract class Base {
  public name: string = ''
  public abstract execute(...options: any[]): any
}
