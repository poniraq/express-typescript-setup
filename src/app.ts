require('preload');

import * as express from 'express';
import { attachControllers } from '@decorators/express';

import { Middleware } from './middleware';
import { all } from './controllers';

const app = express();
app.use(Middleware);

attachControllers(app, all);
app.listen(3000, () => {
  console.log('listening on port 3000');
});
