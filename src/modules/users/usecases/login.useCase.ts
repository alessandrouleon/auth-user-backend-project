import { Inject, Injectable } from "@nestjs/common";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UsersRepositoryContract')
        private repository: UsersRepositoryContract
    ) { }

    async authUsername(username: string): Promise<UserEntity> {
        return await this.repository.findByUsername(username);
       }

}