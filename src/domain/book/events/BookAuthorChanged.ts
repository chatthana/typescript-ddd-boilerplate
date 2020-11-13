import { IEvent } from "@core/IEvent";

export class BookAuthorChanged implements IEvent {
  constructor(
    public author: string,
  ) {}
}