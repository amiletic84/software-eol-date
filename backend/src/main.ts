import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import cors from 'cors';
import { parseToRegex } from './utils/util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger  = new Logger("main", { timestamp: true });

  app.use((req: any, res: any, next: any) => {
    logger.log(`starting request on: ${req.method} ${req.url}`);
    next();
  });


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
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`App started and listening on port ${port}`);
}
bootstrap();
