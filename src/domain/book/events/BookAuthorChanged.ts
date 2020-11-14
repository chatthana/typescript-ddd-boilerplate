import { IEvent } from "@core/IEvent";

export class BookAuthorChanged implements IEvent {
  constructor(
    public guid: string,
    public author: string,
  ) {}
}