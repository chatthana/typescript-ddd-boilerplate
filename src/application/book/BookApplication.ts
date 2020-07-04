import { injectable, inject } from "inversify";
import { TYPES } from "@constants/types";
import { IBookRepository } from "@domain/book/IBookRepository";

@injectable()
export class BookApplication {
  constructor(
    @inject(TYPES.BookRepository) private readonly bookRepository: IBookRepository
  ) { }

  async getAllBooks() {
    const books = await this.bookRepository.findAll();
    return books;
  }
}