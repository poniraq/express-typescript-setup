import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from 'http-errors';
import { concat } from 'lodash';
import { Rule, RuleConfigs, Rules } from './rules';


const DefaultSource: SourceType = 'body';

export function ParametersMiddleware(config: ParametersMiddlewareConfig) {
  if (!config.source) {
    config.source = DefaultSource;
  }

  return class implements Middleware {
    use(req: Request, _res: Response, next: NextFunction): void {
      const source: object = req[config.source];
      let errors: RuleError[] = [];

      Rules.forEach(rule => {
        const ruleErrors: RuleError[] = this.processRule(source, rule);

        errors = concat(errors, ruleErrors);
      });

      if (errors.length) {
        return next(
          new BadRequest(this.getErrorMessage(errors))
        );
      }

      next();
    }

    processRule(source: object, rule: Rule) {
      const defaults = rule.defaults || [];
      const params = concat(defaults, config[rule.type] || []);
      const errors: RuleError[] = [];

      params.forEach(param => {
        const error = this.processParameter(source, rule, param);

        if (error) {
          errors.push(error);
        }
      })

      return errors;
    }

    processParameter(source: object, rule: Rule, param: string): RuleError {
      if (!rule.condition(source, param)) {
        return;
      }
      
      if (rule.hasOwnProperty('action')) {
        rule.action(source, param);
      }
      
      if (rule.hasOwnProperty('template')) {
        return {
          param: param,
          message: rule.template(param)
        };
      }
    }

    getErrorMessage(errors: RuleError[]) {
      return JSON.stringify(errors);
    }
  };
}


// TYPES

interface RuleError {
  param: string;
  message: string;
}

type SourceType = 'body' | 'query' | 'params';
type SourceConfig = { source?: SourceType; }
type ParametersMiddlewareConfig = SourceConfig & RuleConfigs;