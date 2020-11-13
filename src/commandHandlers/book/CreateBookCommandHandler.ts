import { inject, injectable } from 'inversify';
import { ICommandHandler } from '@core/ICommandHandler';
import { CreateBookCommand } from '../../commands/book/CreateBook';
import { Book } from '@domain/book/Book';
import { UpdateBookCommand } from '../../commands/book/UpdateBook';
import Events from 'events';
import { TYPES } from '@constants/types';
import { IRepository } from '@core/IRepository';

@injectable()
export class CreateBookCommandHandler implements ICommandHandler<CreateBookCommand> {
  
  constructor(
    private readonly eventBus: Events.EventEmitter,
    private readonly repository: IRepository<Book>,
  ) {}
  
  handle(command: CreateBookCommand) {
    const book = new Book(command.guid, command.name, command.author, command.price);
    console.log(book.getUncommittedEvents());
    this.eventBus.emit('test', book.getUncommittedEvents());
  }
}