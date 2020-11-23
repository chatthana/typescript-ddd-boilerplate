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
import { IEventStore } from '@core/IEventStore';
import { EventStore } from '@infrastructure/eventstore';
import { UpdateBookAuthor } from '@commands/book/UpdateBookAuthor';
import { UpdateBookAuthorCommandHandler } from '@commandHandlers/book/UpdateBookAuthorCommandHandler';
import { BookCreatedEventHandler } from '@eventHandlers/book/BookCreatedEventHandler';
import { IEventHandler } from '@core/IEventHandler';
import { BookEvent } from '@domain/book/events';
import { EventHandler } from '@infrastructure/eventHandler';
import { BookAuthorChangedEventHandler } from '@eventHandlers/book/BookAuthorChangedEventHandler';

const initialise = async () => {
  const container = new Container();

  // Module Registration
  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  const eventbus: Events.EventEmitter = getEventBus();
  const eventStore: IEventStore = new EventStore(db, eventbus);

  // Register command handlers to the bus
  const commandBus = new CommandBus();
  commandBus.registerHandler(CreateBookCommand.name, new CreateBookCommandHandler(eventbus, new Repository<Book>(eventStore, Book)));
  commandBus.registerHandler(UpdateBookAuthor.name, new UpdateBookAuthorCommandHandler(eventbus, new Repository<Book>(eventStore, Book)));

  container.bind<Db>(TYPES.Db).toConstantValue(db);
  container.bind<CommandBus>(TYPES.CommandBus).toConstantValue(commandBus);
  container.bind<Events.EventEmitter>(TYPES.EventBus).toConstantValue(eventbus);
  container.bind<EventHandler>(TYPES.EventHandler).to(EventHandler);
  container.bind<IEventHandler<BookEvent>>(TYPES.Event).to(BookCreatedEventHandler);
  container.bind<IEventHandler<BookEvent>>(TYPES.Event).to(BookAuthorChangedEventHandler);
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
