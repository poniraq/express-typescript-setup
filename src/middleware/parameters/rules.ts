import { omit } from 'lodash';
 
export type RuleType = 'remove' | 'forbidden' | 'required';
export type RuleCondition = (source: object, param: string) => boolean;
export type RuleAction = (source: object, param: string) => object;
export type RuleTemplate = (param: string) => string;
export type RuleConfigs = { [type in RuleType]?: string[] };
 
export interface Rule {
  type: RuleType;
  condition: RuleCondition;
  
  defaults?: string[];
  action?: RuleAction;
  template?: RuleTemplate;
}
 
 
const Rules: Rule[] = [{
  type: 'forbidden',
  condition: (source, param) => source.hasOwnProperty(param),
  template: (param) => `Forbidden parameter '${param}'`,
}, {
  type: 'required',
  condition: (source, param) => !source.hasOwnProperty(param),
  template: (param) => `Missing required parameter '${param}'`
}, {
  type: 'remove',
  defaults: ['id'],
  condition: (source, param) => source.hasOwnProperty(param),
  action: (source, param) => { return omit(source, param); }
}];
 
export { Rules, Rules as default };