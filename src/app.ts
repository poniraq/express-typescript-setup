import * as express from 'express';
import { attachControllers } from '@decorators/express';

import middleware from './middleware';
import * as ErrorMiddleware from './middleware/errors';

import { all } from './controllers';

const app = express();
app.use(middleware);

ErrorMiddleware.provide();
attachControllers(app, all);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
