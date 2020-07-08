import { Entity } from '@core/Entity';

export interface IBookProps {
  name: string;
  author: string;
}

export class Book extends Entity<IBookProps> {
  private name: string;
  private author: string;

  constructor({ name, author }: IBookProps, guid?: string) {
    super(guid);
    this.name = name;
    this.author = author;
  }

  setName(name: string) {
    this.name = name;
  }

  setAuthor(authorName: string) {
    this.author = authorName;
  }

  static create({ name, author }: IBookProps, guid?: string) {
    return new Book({ name, author }, guid);
  }
}
