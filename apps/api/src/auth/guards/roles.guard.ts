import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { RoleEnum } from '../enums';
import { UserService } from '@app/models/mariadb/services';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    try {
      const userRoles: string[] = await this.userService.getUserRolesByToken(
        request.session.passport.user.id,
      );
      const isAllowed = requiredRoles.some((required) =>
        userRoles.includes(required),
      );
      return isAllowed;
    } catch (error) {
      return false;
    }
  }
}
