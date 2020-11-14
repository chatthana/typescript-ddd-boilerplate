import { IEvent } from "./IEvent";

export class EventDescriptor {
  constructor(
    public aggregateId: string,
    public event: IEvent,
  ) {}
}