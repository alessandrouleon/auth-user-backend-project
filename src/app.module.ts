import { Module } from '@nestjs/common';
import { PrismaModule } from './gateways/prisma/prisma.module';
import { UserModule } from './modules/users/models/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';


@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule
  ], 
  providers: [ //O uso desse provedor deixa todas as rotas provadas.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
