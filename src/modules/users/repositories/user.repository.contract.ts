import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

export interface UserRepositoryContract {
  createUser(data: CreateUserDto): Promise<UserEntity | null>;
}
