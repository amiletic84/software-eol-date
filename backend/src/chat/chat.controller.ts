import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PromptService, SoftwareInformation } from './prompt.service';
import { AuthGuard } from '../auth/auth.guard';

export class SendMessageDto {
  prompt: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  @UseGuards(AuthGuard)
  async sendMessage(@Body() body: SendMessageDto): Promise<{ reply: SoftwareInformation }> {
    const reply = await this.promptService.sendPrompt(body.prompt);
    return { reply: reply };
  }
}
