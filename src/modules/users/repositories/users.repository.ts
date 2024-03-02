import { Injectable } from '@nestjs/common';
import { UsersRepositoryContract } from './users.repository.contract';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryContract {
  constructor(private readonly repository: PrismaService) { }

  async createUser(data: CreateUserDto): Promise<UserEntity | null> {
    return await this.repository.user.create({ data })
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const findUsername = await this.repository.user.findUnique({
      where: { username }
    });
    return findUsername;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const findEmail = await this.repository.user.findUnique({
      where: { email }
    });
    return findEmail;
  }

}
