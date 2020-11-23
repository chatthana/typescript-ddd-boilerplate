import { Request, Response } from 'express';
import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '@constants/types';
import { ok } from '../processors/response';
import { CommandBus } from '@infrastructure/commandBus';
import { CreateBookCommand } from '@commands/book/CreateBook';
import { UpdateBookAuthor } from '@commands/book/UpdateBookAuthor';

import Redis from 'ioredis';
import { NotFoundException } from '@core/ApplicationError';

@controller('/api/v1/books')
export class BookController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.Redis) private readonly redisClient: Redis.Redis,
  ) {}

  @httpGet('/')
  async getAllBooks(@request() req: Request, @response() res: Response) {
    const books = [];
    const keys = await this.redisClient.keys('books:*');
    
    for (const key of keys) {
      const result = await this.redisClient.get(key);
      if (result) {
        books.push({ guid: key.replace('books:', ''), ...JSON.parse(result) });
      }
    }

    return res.json(ok('Successfully retrieved all books', books));

  }

  @httpGet('/:guid')
  async getBookByGuid(@request() req: Request, @response() res: Response) {
    const book = await this.redisClient.get(req.params.guid);
    if (!book) {
      throw new NotFoundException('The requested book does not exist');
    }
    return res.json(ok('Successfully retrieve the book', JSON.parse(book)));
  }

  @httpPost('/')
  async createBook(@request() req: Request, @response() res: Response) {
    const { name, author, price } = req.body;
    
    const command = new CreateBookCommand(name, author, price);
    await this.commandBus.send(command);

    return res.json(ok('Successfully created the book', undefined));
  }

  @httpPut('/:guid/author')
  async updateAuthor(@request() req: Request, @response() res: Response) {
    const { author, version } = req.body;
    const command = new UpdateBookAuthor(req.params.guid, author, version);
    await this.commandBus.send(command);
    return res.json(ok('Successfully update the book', undefined));
  }
}
