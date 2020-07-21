import { Command } from '@core/Command';

export class CreateBookCommand extends Command {
  public name: string;
  public author: string;
  public price: number;

  constructor(name: string, author: string, price: number, guid?: string, version?: number) {
    super(guid, version);
    this.name = name;
    this.author = author;
    this.price = price;
  }
}