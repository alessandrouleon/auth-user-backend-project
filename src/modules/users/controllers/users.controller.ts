import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
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

  @Controller('users')
  export class UsersController {
    constructor(
      private readonly createUserUseCase: CreateUserUseCase,
      private readonly updateUserUseCase: UpdateUserUseCase,
      private readonly deleteUserUseCase: DeleteUserUseCase,
    ) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.createUserUseCase.execute(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
      return this.updateUserUseCase.update(id, updateUserDto);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.deleteUserUseCase.delete(id);
    }
  
} 