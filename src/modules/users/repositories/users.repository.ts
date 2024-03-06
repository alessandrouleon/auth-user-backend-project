import { Injectable } from '@nestjs/common';
import { IUsersReturnWithPagination, UsersRepositoryContract } from './users.repository.contract';
import { UserEntity } from '../entities/user.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ISearchWithColumn, PaginatedData } from 'src/utils/pagination';
import { PaginatedUsersDTO } from '../dtos/paginated-users.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryContract {
  constructor(private readonly repository: PrismaService) { }

  async createUser(data: CreateUserDto): Promise<UserEntity | null> {
    return await this.repository.user.create({ data })
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    return this.repository.user.update({
      where: { id },
      data
    });
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

  async findByUserId(id: string): Promise<UserEntity> {
    return await this.repository.user.findUnique({
      where: { id, deletedAt: null }
    })
  }

  async deleteUser(id: string, data: UpdateUserDto): Promise<void> {
    await this.repository.user.updateMany({
      where: { id },
      data
    })
  }

  // async findAll(): Promise<UserEntity[]> {
  //   return await this.repository.user.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       username: true,
  //       email: true,
  //       password: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       deletedAt: true
  //     },
  //     where: { deletedAt: null }
  //   })
  // }

  async searchUsersCaseFormatDate(
    { skip, take }: PaginatedData,
    {
      //  column, 
       value }: ISearchWithColumn
  ): Promise<IUsersReturnWithPagination> {
    const user = await this.repository.user.findMany({
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
      },
      // where: { 
      //    [column]: value, deletedAt: null }
    });
    const [data, total] = [user, user.length];
    return { users: data, total }
  }

  async findAllUsersWithPagination(
    { page, take }: PaginatedData
  ): Promise<IUsersReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.user.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: { deletedAt: null }
      }),
      this.repository.user.count({ where: { deletedAt: null } })
    ]);
    return { users: data, total }
  }
//avaliar
  // public async findByUnifiedValueSearch(value: string): Promise<UserEntity[] | null> {
  //   const user = await this.repository.user.findMany({
  //     where: {
  //       OR: [
  //         {
  //           name: { contains: value },
  //         },
  //         {
  //           username: { contains: value },
  //         },
  //         {
  //           email: { contains: value },
  //         },
  //       ],
  //     },
  //   });
  //   return user;

  // }
}
