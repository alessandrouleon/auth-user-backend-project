import {  IsString, Matches } from 'class-validator';
import { UserMessagesHelper } from 'src/utils/messages.helps';
import { RegExHelper } from 'src/utils/regex.helprs';

export class CreateUserDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: UserMessagesHelper.EMPTY_NAME })
  name: string;

  @IsString()
  @Matches(/\S/, { message: UserMessagesHelper.EMPTY_USERNAME })
  username: string;

  @IsString()
  @Matches(/\S/, { message: UserMessagesHelper.EMPTY_EMAIL })
  @Matches(RegExHelper.emailFormat, {
    message: UserMessagesHelper.NOT_TYPE_EMAIL,
  })
  email: string;

  @IsString()
  @Matches(/\S/, { message: UserMessagesHelper.EMPTY_PASSWORD })
  @Matches(RegExHelper.password, {
    message: UserMessagesHelper.PASSWORD_VALID,
  })
  password: string;

  updatedAt?: Date;
  deletedAt?: Date;
}

