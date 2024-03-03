import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { UserMessagesHelper } from "src/utils/messages.helps";

@Injectable()
export class UserValidateService {
    constructor(
        @Inject('UsersRepositoryContract')
        private repository: UsersRepositoryContract) { }

    async validateUsernameOnUpdate(newUsername: string, oldUsername: string): Promise<void> {
        if (newUsername !== oldUsername) {
            const existUsername =
                await this.repository.findByUsername(newUsername);
            if (existUsername) {
                throw new HttpException(
                    UserMessagesHelper.EXIST_USERNAME,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }

    async validateEmailOnUpdate(newEmail: string, oldEmail: string): Promise<void> {
        if (newEmail !== oldEmail) {
            const existEmail =
                await this.repository.findByEmail(newEmail);
            if (existEmail) {
                throw new HttpException(
                    UserMessagesHelper.EXIST_EMAIL,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
    }
    async validateUsernameAndEmailOnCreate(username: string, email: string): Promise<void> {

        const [existsUsername, existsEmail] = await Promise.all([
          this.repository.findByUsername(username),
          this.repository.findByEmail(email)
        ]);
    
        if (existsUsername) {
          throw new HttpException(
            UserMessagesHelper.EXIST_USERNAME,
            HttpStatus.BAD_REQUEST,
          );
        }
    
        if (existsEmail) {
          throw new HttpException(
            UserMessagesHelper.EXIST_EMAIL,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
}
