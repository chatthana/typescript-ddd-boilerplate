import { IEvent } from "@core/IEvent";

export class BookCreated implements IEvent {
  constructor(
    public guid: string,
    public name: string,
    public author: string,
    public price: number
  ) {}
}