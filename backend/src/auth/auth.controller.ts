import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

export class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ success: boolean }> {
    const isValid = this.authService.validateUser(body.username, body.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    res.cookie('auth', 'authenticated', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<{ success: boolean }> {
    res.clearCookie('auth');
    return { success: true };
  }
}
