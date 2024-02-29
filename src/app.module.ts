import { Module } from '@nestjs/common';
import { PrismaModule } from './adapters/prisma/prisma.module';


@Module({
  imports: [
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
