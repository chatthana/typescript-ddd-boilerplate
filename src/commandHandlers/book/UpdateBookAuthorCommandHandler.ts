import { inject, injectable } from 'inversify';
import { ICommandHandler } from '@core/ICommandHandler';
import { CreateBookCommand } from '../../commands/book/CreateBook';
import { Book } from '@domain/book/Book';
import { UpdateBookAuthor } from '../../commands/book/UpdateBookAuthor';
import Events from 'events';
import { IRepository } from '@core/IRepository';

@injectable()
export class UpdateBookAuthorCommandHandler implements ICommandHandler<UpdateBookAuthor> {
  
  constructor(
    private readonly eventBus: Events.EventEmitter,
    private readonly repository: IRepository<Book>,
  ) {}
  
  async handle(command: UpdateBookAuthor) {
    const book = await this.repository.getById(command.guid);
    book.changeAuthor(command.author);
  }
}