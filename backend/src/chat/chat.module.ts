import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PromptService } from './prompt.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PromptService],
})
export class ChatModule {}
