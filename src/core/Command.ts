import { ICommand } from './ICommand';

import { v4 as uuidv4 } from 'uuid';

export abstract class Command implements ICommand {
  public guid: string;
  public version: number;

  constructor(guid?: string, version?: number) {
    this.guid = guid || uuidv4();
    this.version = version || 1;
  }
}