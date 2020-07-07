import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
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
    return res.json({
      status: '000',
      message: 'Success',
      data: books,
    });
  }

  @httpGet('/:id')
  async getBookById(@request() req: Request, @response() res: Response) {
    const book = await this.bookApplication.getById(req.params.id);
    return res.json({
      status: '000',
      message: 'Success',
      data: book,
    });
  }

  @httpPost('/')
  async createBook(@request() req: Request, @response() res: Response) {
    const { body } = req;
    await this.bookApplication.createBook(body);
    return res.json({
      status: '000',
      message: 'Success'
    });
  }
}
