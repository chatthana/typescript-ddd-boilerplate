import { EventDescriptor } from "@core/EventDescriptor";
import { IEvent } from "@core/IEvent";
import { IEventStore } from "@core/IEventStore";

export class EventStore implements IEventStore {

  private events: any = {};

  saveEvents(aggregateGuid: string, events: IEvent[]) {
    
    if (!this.events[aggregateGuid]) {
      this.events[aggregateGuid] = [];
    }

    for (const event of events) {
      this.events[aggregateGuid].push(new EventDescriptor(aggregateGuid, event));
    }

  }

  getEventsForAggregate(aggregateGuid: string): IEvent[] {
    if (!this.events[aggregateGuid]) return [];
    return this.events[aggregateGuid].map((eventDescriptor: EventDescriptor) => eventDescriptor.event);
  }
}