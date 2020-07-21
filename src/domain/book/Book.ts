import { AggregateRoot } from '@core/AggregateRoot';

export interface IBookProps {
  name: string;
  author: string;
  price: number;
}

export class Book extends AggregateRoot {
  private name: string;
  private author: string;
  private price: number;

  constructor({ name, author, price }: IBookProps, guid?: string) {
    super(guid);
    this.name = name;
    this.author = author;
    this.price = price;
  }

  static create(props: IBookProps, guid?: string) {
    return new Book(props, guid);
  }
}
