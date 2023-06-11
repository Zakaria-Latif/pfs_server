import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.headers['content-type'] = 'application/json';

    req.headers['x-apollo-operation-name'] = 'operation-name';
    req.headers['apollo-require-preflight'] = 'pre-flight-value';

    next();
  }
}
