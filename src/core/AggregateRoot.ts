import { v4 as UUID } from 'uuid';
import { IEvent } from './IEvent';

export abstract class AggregateRoot {
  [x: string]: any;
  public guid: string;
  private __changes: any[] = [];

  constructor(guid?: string) {
    this.guid = guid || UUID();
  }

  public getUncommittedEvents(): IEvent[] {
    return this.__changes;
  }

  public markChangesAsCommitted(): void {
    this.__changes = [];
  }

  protected applyChange(event: IEvent) {
    this.applyEvent(event);
  }

  private applyEvent(event: IEvent, isNew?: boolean) {
    this.apply(event);
    this.__changes.push(event);
  }
  
  public loadFromHistory(events: IEvent[]) {
    return events;
  }
} 