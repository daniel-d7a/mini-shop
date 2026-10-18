import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { AuthedRequest } from '../request-auth.js';

@Injectable()
export class PbacGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthedRequest>();
    const tenantId = request.auth?.user.tenantId;
    if (!tenantId) {
      throw new ForbiddenException('Tenant context is missing');
    }
    return true;
  }
}
