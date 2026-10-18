import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { PbacGuard } from '../../common/guards/pbac.guard.js';
import type { RequestAuth } from '../../common/request-auth.js';

@Controller('me')
export class MeController {
  @Get()
  getMe(@CurrentUser() auth: RequestAuth) {
    return {
      user: auth.user,
      session: {
        id: auth.session.id,
        expiresAt: auth.session.expiresAt,
      },
    };
  }

  @Get('tenant')
  @UseGuards(PbacGuard)
  getTenant(@CurrentUser() auth: RequestAuth) {
    return { tenantId: auth.user.tenantId };
  }
}
