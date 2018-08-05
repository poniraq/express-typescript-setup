import ExpressRequestId = require('express-request-id');

const RequestIdMiddleware = ExpressRequestId();
export { RequestIdMiddleware, RequestIdMiddleware as default };
