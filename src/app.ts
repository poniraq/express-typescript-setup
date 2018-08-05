require('preload');

import * as express from 'express';
import { attachControllers } from '@decorators/express';

import { GlobalMiddleware } from 'middleware/global';
import { all } from 'controllers';

const app = express();
app.use(GlobalMiddleware);

attachControllers(app, all);
app.listen(3000, () => {
  console.log('listening on port 3000');
});
