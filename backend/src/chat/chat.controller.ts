import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PromptService, SoftwareInformation } from './prompt.service';

export class SendMessageDto {
  prompt: string;
}

@Controller('chat')
export class ChatController {
  constructor(private readonly promptService: PromptService) {}

  @Post()
  async sendMessage(@Body() body: SendMessageDto): Promise<{ reply: SoftwareInformation }> {
    const reply = await this.promptService.sendPrompt(body.prompt);
    return { reply: reply };
  }
}
