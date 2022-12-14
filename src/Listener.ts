export abstract class Listener {
  name: string = ''
  once: boolean = false
  execute(...options: any[]): void {}
}
