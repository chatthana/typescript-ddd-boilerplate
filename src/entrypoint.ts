import { Container } from 'inversify';
import { TYPES } from '@constants/types';
import Events from 'events';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import config from '@config/main';

import '@interfaces/http/controllers';
import { createMongodbConnection } from '@infrastructure/db/mongodb';
// import { BookDataMapper } from '@infrastructure/dataMapper/BookDataMapper';
import { Db } from 'mongodb';
import { errorHandler } from '@interfaces/http/middlewares/ErrorHandler';
import { Application } from 'express';
import { getEventBus } from '@infrastructure/eventbus/EventBus';
import { CommandBus } from '@infrastructure/commandBus';
import { CreateBookCommand } from '@commands/book/CreateBook';
import { CreateBookCommandHandler } from '@commandHandlers/book/CreateBookCommandHandler';
import { Repository } from '@infrastructure/repositories/Repository';
import { Book } from '@domain/book/Book';

const initialise = async () => {
  const container = new Container();

  // Module Registration
  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  const eventbus: Events.EventEmitter = getEventBus();

  const commandBus = new CommandBus();
  commandBus.registerHandler(CreateBookCommand.name, new CreateBookCommandHandler(eventbus, new Repository<Book>(db, Book)));

  container.bind<Db>(TYPES.Db).toConstantValue(db);
  container.bind<CommandBus>(TYPES.CommandBus).toConstantValue(commandBus);
  container.bind<Events.EventEmitter>(TYPES.EventBus).toConstantValue(eventbus);
  // container.bind<BookDataMapper>(TYPES.BookDataMapper).to(BookDataMapper);
  // container.bind<IBookRepository>(TYPES.BookRepository).to(BookRepository);
  // ======================================================
  

  // API Server initialisation
  const server = new InversifyExpressServer(container);

  server.setConfig((app: Application) => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
  });

  server.setErrorConfig((app: Application) => {
    app.use(errorHandler);
  });

  const apiServer = server.build();
  apiServer.listen(config.API_PORT, () =>
    console.log('The application is initialised on the port %s', config.API_PORT)
  );
  // ======================================================
  return container;
};

export { initialise };
