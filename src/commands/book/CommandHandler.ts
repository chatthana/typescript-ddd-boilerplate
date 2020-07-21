import { injectable } from 'inversify';
import { ICommandHandler } from '@core/ICommandHandler';

@injectable()
export class BookCommandHandler implements ICommandHandler<any> {
  async execute() {
    throw new Error('Method not implemented');
  }
}