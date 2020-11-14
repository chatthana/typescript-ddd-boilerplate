import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
  httpPut,
  httpDelete,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '@constants/types';
import { ok } from '../processors/response';
import { CommandBus } from '@infrastructure/commandBus';
import { CreateBookCommand } from '@commands/book/CreateBook';
import { UpdateBookAuthor } from '@commands/book/UpdateBookAuthor';

@controller('/api/v1/books')
export class BookController {
  constructor(
    // @inject(TYPES.BookApplication)
    // private readonly bookApplication: any,
    @inject(TYPES.CommandBus)
    private readonly commandBus: CommandBus,
  ) {}

  // @httpGet('/')
  // async getAllBooks(@request() req: Request, @response() res: Response) {
  //   const books = await this.bookApplication.getAllBooks();
  //   return res.json(ok(books, 'Successfully retrieved all books'));
  // }

  // @httpGet('/:id')
  // async getBookById(@request() req: Request, @response() res: Response) {
  //   const book = await this.bookApplication.getById(req.params.id);
  //   return res.json(ok(book, `Successfully a book with an ID of ${req.params.id}`));
  // }

  @httpPost('/')
  async createBook(@request() req: Request, @response() res: Response) {
    const { name, author, price } = req.body;
    
    const command = new CreateBookCommand(name, author, price);
    this.commandBus.send(command);

    return res.json({
      status: '000',
      message: 'Success'
    });
  }

  @httpPut('/:guid/author')
  async updateAuthor(@request() req: Request, @response() res: Response) {
    const { author } = req.body;
    const command = new UpdateBookAuthor(author, req.params.guid);
    this.commandBus.send(command);
  }

  // @httpPut('/:id')
  // async updateBook(@request() req: Request, @response() res: Response) {
  //   const { id } = req.params;
  //   const { body } = req;
  //   await this.bookApplication.updateBook(id, body);
  //   return res.json({
  //     status: '000',
  //     message: 'Success'
  //   });
  // }

  // @httpDelete('/:id')
  // async deleteBook(@request() req: Request, @response() res: Response) {
  //   const { id } = req.params;
  //   await this.bookApplication.deleteBook(id);
  //   return res.json({
  //     status: '000',
  //     message: 'Success'
  //   });
  // }
}
