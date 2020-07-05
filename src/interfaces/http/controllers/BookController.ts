import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '@constants/types';
import { BookApplication } from '@application/book/BookApplication';

@controller('/books')
export class BookController {
  constructor(
    @inject(TYPES.BookApplication)
    private readonly bookApplication: BookApplication
  ) {}

  @httpGet('/')
  async getAllBooks(@request() req: Request, @response() res: Response) {
    const books = await this.bookApplication.getAllBooks();
    console.log('test');
    return res.json({
      status: '000',
      message: 'Success',
      data: books,
    });
  }
}
