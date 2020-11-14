import { AggregateRoot } from '@core/AggregateRoot';
import { IEvent } from '@core/IEvent';
import { BookCreated } from './events/BookCreated';
import { BookAuthorChanged } from './events/BookAuthorChanged';

export interface IBookProps {
  name: string;
  author: string;
  price: number;
}

export class Book extends AggregateRoot {

  public name!: string;
  public author!: string;
  public price!: number;

  constructor();

  constructor(guid: string, name: string, author: string, price: number);

  constructor(guid?: string, name?: string, author?: string, price?: number) {
    super(guid);
    // This if block is required as we instantiate the aggregate root in the repository
    if (guid && name && author && price) {
      this.applyChange(new BookCreated(this.guid, name!, author!, price!));
    }
  }

  public changeAuthor(author: string) {
    this.author = author;
    this.applyBookAuthorChanged(new BookAuthorChanged(this.guid, author));
  }

  public applyBookCreated(event: BookCreated): void {
    this.guid = event.guid;
    this.name = event.name;
    this.author = event.author;
    this.price = event.price;
  }

  public applyBookAuthorChanged(event: BookAuthorChanged): void {
    this.author = event.author;
  }
}
