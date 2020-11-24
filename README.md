# TypeScript DDD API Boilerplate
Seed project (boilerplate) for RESTful API that leverages the concept of Domain Driven Design (DDD) with CQRS and Event Sourcing

### Foreword from the author
This API project utilises information from multiple sources to create the fine-tuned API product with the following objectives

1. To build a maintainable enterprise grade application
2. The application that follows `SOLID` principles as much as possible
3. To build an application that benefits most of the stakeholders in an organisation
4. To decouple the read and the write side of the application. Thus, they can be scaled indenpendently
5. To build the CQRS and Event Sourcing system

### Architecture
This project uses DDD with Onion Architecture as illustrated in below images

![](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlKQYp4rl0kH9GTuH0V0GU1QwyAhjIPy3aJQ&usqp=CAU)

Below image illustrates the more detailed architecture

![](https://miro.medium.com/max/1182/1*G96qMzpZM1fIEAHBjFEJeA.jpeg)

In CQRS & Event Sourcing systems, the main idea is to implement different data models for read and write sides of the application.

The workflow is that the write side sends the `commands` to the `command handlers` through `commandBus` to alter the information. The succeeded commands will then generate resulting `events` which are then stored in the `event store`. Finally, the `event handlers` subscribe to events and generate the denormalised data ready for the query.

The only source of truth of Event Sourcing systems is the `event store` while the data in the read store is simply a derivative of the events generated from the write side. This means we can use totally different data structure between the read and the write sides and we can replay the events from the event store from the whenever we want the regenerate the denormalised data in whatever shapes we want.

In this example, we use `MongoDB` as an event store and `Redis` as the read store.

The commands are sent by the frontend to the `commandBus` which then selects appropriate `command handlers` for the commands. The command handlers then prepare the `Aggregate Root` and apply the business logic suitable for them. If the commands succeed, they result in events which will then be sent to the `eventBus` to the `event handlers`.

To read more about CQRS and Event Sourcing. Please check [this link](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)

### Technologies
1. Node.js
2. TypeScript
3. MongoDB with MongoDB native driver as an event store (mongodb package on NPM)
4. InversifyJS as an IoC container
5. Express (via Inversify Express Utils) as an API framework
6. Redis as a read store
7. EventEmitter as the message bus (used by both command and event sides)

## Getting Started
To run the project, make sure you have these dependencies installed on your system

1. Node.js v8 or later
2. Typescript with `tsc` command
3. Nodemon
4. ts-node
5. MongoDB
6. Redis Server and Clients (redis-cli)

You also need to setup and initialise MongoDB database. Then, copy the `.env_example` file into `.env` file by firing the command

````bash
cp .env_template .env
````

Do adjust the DB_NAME and MONGODB_URI to match your configuration then run

````bash
yarn dev
````