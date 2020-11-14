import { Commands } from '@constants/commands';
import { Command } from '@core/Command';

export class UpdateBookAuthor extends Command {
  constructor(
    public author: string,
    guid?: string,
  ) {
    super(guid);
  }
}