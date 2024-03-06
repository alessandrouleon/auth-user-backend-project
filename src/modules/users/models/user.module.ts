import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CreateUserUseCase } from '../usecases/create-user.useCase';
import { UsersRepository } from '../repositories/users.repository';
import { UpdateUserUseCase } from '../usecases/update-user.useCase';
import { ValidateUserService } from '../services/validate-user.service';
import { DeleteUserUseCase } from '../usecases/delete-user.useCase';
import { GetUserUseCase } from '../usecases/get-user.useCase';

@Module({
  controllers: [UsersController],
  exports: [],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    ValidateUserService,
    {
      provide: 'UsersRepositoryContract',
      useClass: UsersRepository,
    },
  ],
})
export class UserModule {}