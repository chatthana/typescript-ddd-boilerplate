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
    console.log(name);
    this.applyChange(new BookCreated(guid!, name!, author!, price!));
  }

  public apply(event: BookCreated): void;

  public apply(event: BookAuthorChanged): void;

  public apply(event: any): void {
    console.log(event);
    switch (event.constructor.name) {
      case 'BookCreated':
        this.name = event.name;
        this.author = event.author;
        this.price = event.price;
      case 'BookAuthorChanged':
        this.author = event.author;
      default:
        break;
    }
  }
}
