import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepositoryContract } from '../repositories/user.repository.contract';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryContract')
  private usersRepository: UserRepositoryContract) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
   try {
    const user = await this.usersRepository.createUser(createUserDto)    
    return user;
   } catch (error) {
    throw new Error('Não foi possível criar o usuário.');
   }
   
  }
}
