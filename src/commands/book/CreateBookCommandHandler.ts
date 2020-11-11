import { injectable } from 'inversify';
import { ICommandHandler } from '@core/ICommandHandler';
import { CreateBookCommand } from './CreateBook';
import { Book } from '@domain/book/Book';

@injectable()
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand> {
  handle(command: CreateBookCommand) {
    console.log(command);
    const { name, author, price } = command;
    const book = new Book({ name, author, price });
  }
}