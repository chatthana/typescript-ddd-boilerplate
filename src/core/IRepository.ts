export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findOneById(id: string): Promise<T | null>;
  doesExist(id: string): Promise<boolean>;
  save(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}