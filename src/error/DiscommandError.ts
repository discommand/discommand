export class DiscommandError extends Error {
  public constructor(message?: string) {
    super(message)
    this.name = 'DiscommandError'
  }
}
