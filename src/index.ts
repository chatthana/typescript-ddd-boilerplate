import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { initialise } from './inversify.config';

(async () => {
  await initialise();
})();

