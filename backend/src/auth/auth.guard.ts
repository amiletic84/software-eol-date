import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authCookie = request.cookies?.auth;

    if (authCookie !== 'authenticated') {
      throw new UnauthorizedException('Authentication required');
    }

    return true;
  }
}
