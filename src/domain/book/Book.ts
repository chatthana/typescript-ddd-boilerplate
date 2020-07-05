import { v4 as UUID } from 'uuid';

export interface IBookProps {
  name: string;
  author: string;
}

export class Book {
  private readonly guid: string;
  private name: string;
  private author: string;

  constructor({ name, author }: IBookProps, guid?: string) {
    this.guid = guid || UUID();
    (this.name = name), (this.author = author);
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
