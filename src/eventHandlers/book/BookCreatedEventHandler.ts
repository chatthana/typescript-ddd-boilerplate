import { TYPES } from "@constants/types";
import { IEventHandler } from "@core/IEventHandler";
import { BookEvent } from "@domain/book/events";
import { inject, injectable } from "inversify";
import Event from "events";
import { BookCreated } from "@domain/book/events/BookCreated";
import Redis from 'ioredis';

@injectable()
export class BookCreatedEventHandler implements IEventHandler<BookEvent> {
  constructor(
    @inject(TYPES.EventBus) private readonly eventBus: Event.EventEmitter,
    @inject(TYPES.Redis) private readonly redisClient: Redis.Redis,
  ) {}

  async handle() {
    this.eventBus.on(BookCreated.name, (event) => {
      this.redisClient.set(`books:${event.guid}`, JSON.stringify({
        name: event.name,
        author: event.author,
        price: event.price,
        version: event.version,
      }));
    });
  }
}