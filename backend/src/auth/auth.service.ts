import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateUser(username: string, password: string): boolean {
    const validUsername = this.configService.get<string>('AUTH_USERNAME');
    const validPassword = this.configService.get<string>('AUTH_PASSWORD');

    if (!validUsername || !validPassword) {
      throw new UnauthorizedException('Auth credentials not configured');
    }

    return username === validUsername && password === validPassword;
  }
}
