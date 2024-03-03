import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface UsersRepositoryContract {
  createUser(data: CreateUserDto): Promise<UserEntity | null>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUserId(id: string): Promise<UserEntity | null>;
}
 