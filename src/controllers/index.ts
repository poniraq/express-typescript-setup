import autoload from 'utils/autoload';
 
const all = autoload(__dirname, /.+\.controller\.js$/);
export { all, all as default };