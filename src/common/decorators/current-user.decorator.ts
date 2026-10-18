import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { AuthedRequest, RequestAuth } from '../request-auth.js';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): RequestAuth | undefined => {
    const request = context.switchToHttp().getRequest<AuthedRequest>();
    return request.auth;
  },
);
