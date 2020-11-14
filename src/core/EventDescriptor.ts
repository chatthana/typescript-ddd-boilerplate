import { IEvent } from "./IEvent";

export class EventDescriptor {
  constructor(
    public aggregateGuid: string,
    public eventPayload: IEvent,
  ) {}
}