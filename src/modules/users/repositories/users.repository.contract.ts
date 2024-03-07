import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SearchValueInColumn, PaginatedData } from 'src/utils/pagination';

export interface IUsersReturnWithPagination {
  users: UserEntity[];
  total: number;
}


export interface UsersRepositoryContract {
  createUser(data: CreateUserDto): Promise<UserEntity | null>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUserId(id: string): Promise<UserEntity | null>;
  deleteUser(id: string, data: UpdateUserDto): Promise<void>;
  searchForAnyUsersValue(value: string): Promise<UserEntity[] | null>;
  findAllUsersWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<IUsersReturnWithPagination>;
}
 