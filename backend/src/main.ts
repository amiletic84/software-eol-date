import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import cors from 'cors';
import { parseToRegex } from './utils/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [parseToRegex(process.env.FRONTEND_URL || ""), 'http://localhost:3000'];

    // Skip CORS for /health
  app.use((req: any, res: any, next: any) => {
    if (req.path === '/health') {
      return next();
    }

    const middleware = cors({
      origin: allowedOrigins,
      credentials: true,
    })
    
    return middleware(req, res, next);
  });


  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
