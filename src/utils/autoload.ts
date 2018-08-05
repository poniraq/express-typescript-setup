import * as klaw from 'klaw-sync';
import { chain } from 'lodash';
import { basename, join, relative } from 'path';
 
 
const indexRegexp = /index\.[tj]s/;
 
export default function autoload(dir: string, ext: RegExp) {
  const files = klaw(dir, { nodir: true });
 
  return chain(files)
    .map(file => relative(dir, file.path))
    .filter(path => indexRegexp.test(basename(path)) === false)
    .filter(path => ext.test(path))
    .map(path => require(join(dir, path)).default)
    .value()
}