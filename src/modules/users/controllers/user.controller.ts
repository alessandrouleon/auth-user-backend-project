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
 
  import { CreateUserUseCase } from '../services/create-user.service';

  @Controller('user')
  export class UserController {
    constructor(
      private readonly createUserUseCase: CreateUserUseCase,

    ) {}
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.createUserUseCase.execute(createUserDto);
    }
}