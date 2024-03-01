import { Module } from '@nestjs/common';
import { PrismaModule } from './gateways/prisma/prisma.module';
import { UserModule } from './modules/users/models/user.module';


@Module({
  imports: [
    PrismaModule,
    UserModule
  ], 
  // controllers: [],
  // providers: [],
})
export class AppModule {}
