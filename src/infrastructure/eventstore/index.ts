import { EventDescriptor } from "@core/EventDescriptor";
import { IEvent } from "@core/IEvent";
import { IEventStore } from "@core/IEventStore";
import { BulkWriteOperation, Collection, Db } from "mongodb";

// TODO: Find the way to properly manage the persistence of the event payload
export class EventStore implements IEventStore {

  private eventCollection: Collection;

  constructor(
    private readonly dbClient: Db
  ) {
    this.eventCollection = this.dbClient.collection('events');
  }

  async saveEvents(aggregateGuid: string, events: IEvent[]) {
    const operations: any[] = [];

    for (const event of events) {
      const eventObject = new EventDescriptor(aggregateGuid, { eventType: event.constructor.name, ...event });
      operations.push({ insertOne: eventObject });
    }

    await this.eventCollection.bulkWrite(operations);
  }

  async getEventsForAggregate(aggregateGuid: string): Promise<IEvent[]> {
    const events = await this.eventCollection.find({ aggregateGuid }).toArray();
    return events.map((eventDescriptor: EventDescriptor) => eventDescriptor.eventPayload);
  }
}