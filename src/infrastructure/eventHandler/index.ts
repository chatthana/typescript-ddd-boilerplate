import { injectable } from "inversify";

@injectable()
export class EventHandler {
  constructor() {}

  initialise(handlers: any) {
    for (const handler of handlers) {
      handler.handle();
    }
  }
}