import type { DiscommandHandler } from '../discommandHandler.js'
import type { Client } from 'discord.js'

export abstract class Base {
  public client?: Client
  public handler?: DiscommandHandler
  protected constructor(public readonly name: string) {}
  public abstract execute(...options: unknown[]): unknown
}
