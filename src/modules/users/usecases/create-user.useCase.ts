import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UsersRepositoryContract } from '../repositories/users.repository.contract';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserMessagesHelper } from 'src/utils/messages.helps';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UsersRepositoryContract')
    private userRepository: UsersRepositoryContract) { }

  async execute(data: CreateUserDto): Promise<UserEntity> {

    await this.checkUserExists(data.username, data.email);

    const hashedUserPassword = await bcrypt.hash(
      data.password, Number(process.env.BCRYPTROUNDS),
    );

    const saveUser = await this.userRepository.createUser({
      ...data,
      password: hashedUserPassword,
    });

    return saveUser;
  }

  private async checkUserExists(username: string, email: string): Promise<void> {

    const [existsUsername, existsEmail] = await Promise.all([
      this.userRepository.findByUsername(username),
      this.userRepository.findByEmail(email)
    ]);

    if (existsUsername) {
      throw new HttpException(
        UserMessagesHelper.EXIST_USERNAME,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existsEmail) {
      throw new HttpException(
        UserMessagesHelper.EXIST_EMAIL,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
