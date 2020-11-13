import { AggregateRoot } from "./AggregateRoot";

export interface IRepository<T> {
  save(aggregateRoot: T): void;
  getById(guid: string): Promise<T>; 
}