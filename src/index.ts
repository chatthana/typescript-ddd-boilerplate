import 'module-alias/register';
import * as dotenv from 'dotenv';
import { EventEmitter } from 'events';
import 'reflect-metadata';
import { initialise } from './entrypoint';
import { TYPES } from '@constants/types';
dotenv.config();

(async () => {
  const container = await initialise();
  const eventEmitter = container.get<EventEmitter>(TYPES.EventBus);
  eventEmitter.on('f', () => console.log('e') );
  eventEmitter.emit('f');
})();

