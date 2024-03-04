import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { UserMessagesHelper } from "src/utils/messages.helps";
import { newDate } from "src/utils/date";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('UsersRepositoryContract')
        private repository: UsersRepositoryContract
    ) { }
    async delete(id: string): Promise<void> {
       const user = await this.repository.findByUserId(id);

       if(!user){
        throw new HttpException(
            UserMessagesHelper.ID_NOT_EXIST_FOR_DELETED,
            HttpStatus.BAD_REQUEST,
        );
       }

      await this.repository.deleteUser(id, {
        ...user,
        deletedAt: newDate(),
      })
    }
}