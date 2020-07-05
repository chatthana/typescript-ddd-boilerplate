import 'module-alias/register';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { initialise } from './inversify.config';
dotenv.config();

(async () => {
  await initialise();
})();
