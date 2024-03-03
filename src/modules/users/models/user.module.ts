import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CreateUserUseCase } from '../usecases/create-user.useCase';
import { UsersRepository } from '../repositories/users.repository';
import { UpdateUserUseCase } from '../usecases/update-user.useCase';
import { UserValidateService } from '../services/user-validate.service';

@Module({
  controllers: [UsersController],
  exports: [],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    UserValidateService,
    {
      provide: 'UsersRepositoryContract',
      useClass: UsersRepository,
    },
  ],
})
export class UserModule {}