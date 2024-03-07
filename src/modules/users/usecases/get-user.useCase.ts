import { Inject, Injectable } from "@nestjs/common";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { PaginatedData, SearchValueInColumn, getParametersToPaginate, paginateResponse } from "src/utils/pagination";
import { PaginatedUsersDTO } from "../dtos/paginated-users.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject('UsersRepositoryContract')
        private repository: UsersRepositoryContract
    ) { }

    private async getValuesInUsers(value: string) {
        return await this.repository.searchForAnyUsersValue(value);
    }

    private async getAllUserPaginated({ skip, take, page }: PaginatedData) {
        const { users, total } = await this.repository.findAllUsersWithPagination({
            skip, take, page
        });
        const goal = paginateResponse({ total, page, take });
        return { users, ...goal }
    }

    public async getUsers({ value }: SearchValueInColumn,
        pageNumber: number
    ): Promise<PaginatedUsersDTO | UserEntity[]> {
        const { skip, take, page } = getParametersToPaginate(pageNumber);

        if (!value) {
            return this.getAllUserPaginated({ page, skip, take });
        }
        if (value) {
            return this.getValuesInUsers(value);
    
        }

    }

}