import { Injectable } from '@nestjs/common';
import { UserRepositoryContract } from './user.repository.contract';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(private readonly repository: PrismaService) { }

  async createUser(data: CreateUserDto): Promise<UserEntity | null> {
  return await this.repository.user.create({data})
  }

}