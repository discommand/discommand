export abstract class Base {
  public name = ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract execute(...options: any[]): any
}
