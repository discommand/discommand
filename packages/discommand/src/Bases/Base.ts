export abstract class Base {
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
  public abstract execute(...options: unknown[]): unknown
}
