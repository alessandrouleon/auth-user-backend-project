import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../usecases/create-user.useCase';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserUseCase } from '../usecases/update-user.useCase';
import { DeleteUserUseCase } from '../usecases/delete-user.useCase';
import { GetUserUseCase } from '../usecases/get-user.useCase';
import { SearchValueInColumn } from 'src/utils/pagination';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { Public } from 'src/modules/auth/public';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly listUserUseCase: GetUserUseCase
  ) { }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.update(id, updateUserDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserUseCase.delete(id);
  }

  @Public()
  @Get('/search/:page')
  async findBySearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.listUserUseCase.getUsers(search, page);
  }
} 