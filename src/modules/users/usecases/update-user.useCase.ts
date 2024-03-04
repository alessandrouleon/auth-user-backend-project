import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { newDate } from "src/utils/date";
import * as bcrypt from 'bcrypt';
import { UserMessagesHelper } from "src/utils/messages.helps";
import { ValidateUserService } from "../services/validate-user.service";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UsersRepositoryContract')
        private usersRepository: UsersRepositoryContract,
        private userService: ValidateUserService
    ) { }

    async update(id: string, data: UpdateUserDto): Promise<UserEntity> {

        const user = await this.usersRepository.findByUserId(id);

        if (!user) {
            throw new HttpException(
                UserMessagesHelper.ID_NOT_EXIST_FOR_UPDATE,
                HttpStatus.BAD_REQUEST,
            );
        }

        await Promise.all([
            this.userService.validateUsernameOnUpdate(data.username, user.username),
            this.userService.validateEmailOnUpdate(data.email, user.email)
        ]);

        const hashedPassword = await bcrypt.hash(
            data.password, Number(process.env.BCRYPTROUNDS),
        );

        return await this.usersRepository.updateUser(id, {
            ...data,
            updatedAt: newDate(),
            password: hashedPassword,
        });
    }
}

