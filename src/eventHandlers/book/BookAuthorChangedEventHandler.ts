import { TYPES } from "@constants/types";
import { IEventHandler } from "@core/IEventHandler";
import { BookEvent } from "@domain/book/events";
import { inject, injectable } from "inversify";
import Event from "events";
import { BookAuthorChanged } from "@domain/book/events/BookAuthorChanged";

@injectable()
export class BookAuthorChangedEventHandler implements IEventHandler<BookEvent> {
  constructor(
    @inject(TYPES.EventBus) private readonly eventBus: Event.EventEmitter,
  ) {}

  async handle() {
    this.eventBus.on(BookAuthorChanged.name, (data) => console.log(data, 'EVENT HANDLER'));
  }
}