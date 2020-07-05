import { injectable, inject } from "inversify";
import { IBookRepository } from "@domain/book/IBookRepository";
import { TYPES } from "@constants/types";
import { Book } from "@domain/book/Book";

@injectable()
export class BookApplication {
  constructor(
    @inject(TYPES.BookRepository)
    private readonly bookRepository: IBookRepository
  ) {}

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.findAll();
    return books;
  }
}
