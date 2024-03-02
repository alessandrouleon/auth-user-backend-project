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

  @Controller('users')
  export class UsersController {
    constructor(
      private readonly createUserUseCase: CreateUserUseCase,

    ) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.createUserUseCase.execute(createUserDto);
    }
}