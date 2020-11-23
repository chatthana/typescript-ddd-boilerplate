export const TYPES = {
  // Dependencies
  Db: Symbol('Db'),
  EventBus: Symbol('EventBus'),

  // Repositories
  BookRepository: Symbol('BookRepository'),

  // Data Mappers
  BookDataMapper: Symbol('BookDataMapper'),

  // Application Services
  BookApplication: Symbol('BookApplication'),

  // Command Bus
  CommandBus: Symbol('CommandBus'),

  // Event
  Event: Symbol('Event'),
  EventHandler: Symbol('EventHandler'),

  // Event Handlers
  BookCreatedEventHandler: Symbol('BookCreatedEventHandler'),
};
