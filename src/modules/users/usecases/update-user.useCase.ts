import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { updatedAt } from "src/utils/date";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UsersRepositoryContract')
        private usersRepository: UsersRepositoryContract
    ) { }

    async update(id: string, data: UpdateUserDto): Promise<UserEntity> {

        const hashedUserPassword = await bcrypt.hash(
            data.password, Number(process.env.BCRYPTROUNDS),
        );

        return await this.usersRepository.updateUser(id, {
            ...data,
            updatedAt: updatedAt(),
            password: hashedUserPassword,
        });
    }
}

