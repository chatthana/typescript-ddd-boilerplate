import { IEvent } from "./IEvent";

export interface IEventStore {
  saveEvents(aggregateGuid: string, eventHistory: IEvent[]): void;
  getEventsForAggregate(aggregateGuid: string): Promise<IEvent[]>;
}