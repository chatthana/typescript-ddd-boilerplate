import { injectable } from 'inversify';
import { ICommandHandler } from '@core/ICommandHandler';
import { CreateBookCommand } from '../../commands/book/CreateBook';
import { Book } from '@domain/book/Book';
import { UpdateBookCommand } from '../../commands/book/UpdateBook';

@injectable()
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand> {
  handle(command: CreateBookCommand) {
    const { name, author, price } = command;
    const book = Book.create({ name, author, price });
  }
}