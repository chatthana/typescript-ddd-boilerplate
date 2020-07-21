import { v4 as UUID } from 'uuid';

export abstract class AggregateRoot {
  public readonly guid: string;

  constructor(guid?: string) {
    this.guid = guid || UUID();
  }

  protected apply(event: any) {
    console.log(event); 
  }

  public loadFromHistory(events: any) {
    return events;
  }
} 