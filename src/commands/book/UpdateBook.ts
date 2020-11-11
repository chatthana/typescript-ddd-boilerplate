import { Commands } from '@constants/commands';
import { Command } from '@core/Command';

export class UpdateBookCommand extends Command {
  public name: string;
  public author: string;
  public price: number;

  // Set static name so we can refer to them easily
  public static commandName = Commands.CREATE_BOOK;

  constructor(name: string, author: string, price: number, guid?: string, version?: number) {
    super(guid, version);
    this.name = name;
    this.author = author;
    this.price = price;
  }
}