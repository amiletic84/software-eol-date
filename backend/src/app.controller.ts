import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("health")
  getHealth(): { status: string } {
    // just return OK
    return { status: 'ok' };
  }

  
  @Get("test")
  @UseGuards(AuthGuard)
  getTestSec(): string {
    // just return OK
    return "Everything is OK";
  }
}
