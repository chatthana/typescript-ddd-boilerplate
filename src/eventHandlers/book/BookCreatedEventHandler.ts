import { TYPES } from "@constants/types";
import { IEventHandler } from "@core/IEventHandler";
import { BookEvent } from "@domain/book/events";
import { inject, injectable } from "inversify";
import Event from "events";
import Redis from 'ioredis';
import { BookCreated } from "@domain/book/events/BookCreated";

@injectable()
export class BookCreatedEventHandler implements IEventHandler<BookEvent> {
  constructor(
    @inject(TYPES.EventBus) private readonly eventBus: Event.EventEmitter,
    @inject(TYPES.Redis) private readonly redisClient: Redis.Redis,
  ) {}

  async handle() {
    this.eventBus.on(BookCreated.name, async (event) => {
      const cachedBook = await this.redisClient.get(`books:${event.guid}`);
      if (cachedBook) {
        const book = JSON.parse(cachedBook);
        await this.redisClient.set(`books:${event.guid}`, JSON.stringify({
          ...book,
          author: event.author,
          version: event.version,
        }));
      }
    });
  }
}