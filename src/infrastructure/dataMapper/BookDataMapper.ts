import { injectable } from 'inversify';
import { IDataMapper } from '@core/IDataMapper';
import { Book } from '@domain/book/Book';

@injectable()
export class BookDataMapper implements IDataMapper<Book, any> {
  toDomain(bookDbResult: any) {
    const { name, author, guid } = bookDbResult;
    return Book.create({ name, author }, guid);
  }

  toDTO(bookEntity: Book) {
    return bookEntity;
  }
}
