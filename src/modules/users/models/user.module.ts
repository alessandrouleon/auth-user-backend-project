import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CreateUserUseCase } from '../usecases/create-user.useCase';
import { UsersRepository } from '../repositories/users.repository';
import { UpdateUserUseCase } from '../usecases/update-user.useCase';
import { ValidateUserService } from '../services/validate-user.service';
import { DeleteUserUseCase } from '../usecases/delete-user.useCase';
import { GetUserUseCase } from '../usecases/get-user.useCase';
import { LoginUseCase } from '../usecases/login.useCase';

@Module({
  controllers: [UsersController],
  exports: [LoginUseCase],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    ValidateUserService,
    LoginUseCase,
    {
      provide: 'UsersRepositoryContract',
      useClass: UsersRepository,
    },
  ],
})
export class UserModule {}