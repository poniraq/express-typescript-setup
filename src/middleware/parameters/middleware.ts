import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import { BadRequest } from 'http-errors';
import { concat, merge } from 'lodash';
import { Rule, RuleConfigs, Rules } from './rules';

const DefaultSource: SourceType = 'body';

/**
 * Parameters Middleware
 * Allows to specify forbidden, required, etc. request parameters
 */
export function ParametersMiddleware(config: ParametersMiddlewareConfig) {
  if (!config.source) {
    config.source = DefaultSource;
  }

  return class implements Middleware {
    use(req: Request, _res: Response, next: NextFunction): void {
      let source: object = req[config.source];
      let errors: RuleError[] = [];

      Rules.forEach(rule => {
        const result = this.processRule(source, rule);
        
        source = result.source;
        errors = concat(errors, result.errors);
      });

      req[config.source] = source;
      if (errors.length) {
        return next(
          new BadRequest(this.getErrorMessage(errors))
        );
      }

      next();
    }

    processRule(source: object, rule: Rule): { source: object, errors: RuleError[]} {
      const defaults = rule.defaults || [];
      const params = concat(defaults, config[rule.type] || []);
      const errors: RuleError[] = [];

      params.forEach(param => {
        const result = this.processParameter(source, rule, param);
        const error = result.error;

        source = result.source;
        if (error) {
          errors.push(error);
        }
      })

      return {
        source: source,
        errors: errors
      };
    }

    processParameter(source: object, rule: Rule, param: string): { source: object, error?: RuleError } {
      let result = {
        source: source
      };

      if (!rule.condition(source, param)) {
        return;
      }
      
      if (rule.hasOwnProperty('action')) {
        result.source = source = rule.action(source, param);
      }
      
      if (rule.hasOwnProperty('template')) {
        result = merge(result, {
          error: {
            param: param,
            message: rule.template(param)
          }
        })
      }

      return result;
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