import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ResponseTextConfig } from 'openai/resources/responses/responses.js';

@Injectable()
export class ChatService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async sendMessage(prompt: string, text?: ResponseTextConfig): Promise<string> {
    const response = await this.openai.responses.create({
      model: 'gpt-5.4-mini',
      temperature: 0.1,
      tools: [{ type: 'web_search_preview' }],
      input: prompt,
      text
    });
    
    return response.output_text ?? '';
  }
}
