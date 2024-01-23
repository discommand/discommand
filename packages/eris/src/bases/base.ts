export abstract class Base {
  protected constructor(public readonly name: string) {}
  public abstract execute(...options: unknown[]): unknown
}
