import { TYPES } from "@constants/types";
import { ConcurrencyException, NotFoundException } from "@core/ApplicationError";
import { EventDescriptor } from "@core/EventDescriptor";
import { IEvent } from "@core/IEvent";
import { IEventStore } from "@core/IEventStore";
import { Collection, Db } from "mongodb";
import Event from 'events';

// TODO: Find the way to properly manage the persistence of the event payload
export class EventStore implements IEventStore {

  private readonly eventCollection: Collection;

  constructor(
    private readonly dbClient: Db,
    private readonly eventBus: Event.EventEmitter,
  ) {
    this.eventCollection = this.dbClient.collection('events');
  }

  async saveEvents(aggregateGuid: string, events: IEvent[], expectedVersion: number) {
    const operations: any[] = [];

    // Try to get the latest event for the aggregate
    const latestEvent = await this.getLastEventDescriptor(aggregateGuid);
    // If it does not exist, create the new empty EventDescriptor
    if (latestEvent && latestEvent.version !== expectedVersion && expectedVersion !== -1) {
      throw new ConcurrencyException('Cannot perform the operation due to internal conflict');
    }

    let i: number = expectedVersion;

    for (const event of events) {
      i++;
      event.version = i;
      const eventObject = new EventDescriptor(aggregateGuid, { eventType: event.constructor.name, ...event }, i);
      this.eventBus.emit(eventObject.eventPayload.eventType!, event);
      operations.push({ insertOne: eventObject });
    }

    await this.eventCollection.bulkWrite(operations);
  }

  async getEventsForAggregate(aggregateGuid: string): Promise<IEvent[]> {
    const events = await this.eventCollection.find({ aggregateGuid }).toArray();
    if (!events.length) {
      throw new NotFoundException('Aggregate with the requested Guid does not exist');
    }
    return events.map((eventDescriptor: EventDescriptor) => eventDescriptor.eventPayload);
  }

  private async getLastEventDescriptor(aggregateGuid: string) {
    const [latestEvent] = await this.eventCollection.find({ aggregateGuid }, { sort: { _id: -1 } }).toArray();
    return latestEvent;
  }
}