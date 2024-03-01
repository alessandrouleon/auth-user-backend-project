import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { CreateUserUseCase } from '../services/create-user.service';
import { UserRepository } from '../repositories/user.repository';

@Module({
  controllers: [UserController],
  exports: [
    CreateUserUseCase,
   
  ],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UserRepositoryContract',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}