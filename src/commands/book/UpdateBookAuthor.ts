import { Commands } from '@constants/commands';
import { Command } from '@core/Command';

export class UpdateBookAuthor extends Command {
  constructor(
    public readonly guid: string,
    public readonly author: string,
    public readonly originalVersion: number,
  ) {
    super(guid);
  }
}