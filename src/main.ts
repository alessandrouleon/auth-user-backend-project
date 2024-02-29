import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 4000 || 4050;
   await app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}
bootstrap(); 
