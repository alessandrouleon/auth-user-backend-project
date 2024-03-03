import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryContract } from '../repositories/users.repository.contract';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserValidateService } from "../services/user-validate.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UsersRepositoryContract')
    private userRepository: UsersRepositoryContract,
    private userService: UserValidateService
  ) { }

  async execute(data: CreateUserDto): Promise<UserEntity> {

    await this.userService.validateUsernameAndEmailOnCreate(data.username, data.email);

    const hashedUserPassword = await bcrypt.hash(
      data.password, Number(process.env.BCRYPTROUNDS),
    );

    const saveUser = await this.userRepository.createUser({
      ...data,
      password: hashedUserPassword,
    });
    return saveUser;
  }

}
