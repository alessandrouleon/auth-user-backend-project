import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UsersRepositoryContract } from "../repositories/users.repository.contract";
import { PaginatedData, PaginationOptionsSearch, getParametersToPaginate, paginateResponse } from "src/utils/pagination";
import { SearchFilterTable } from "src/utils/search-table";
import { PaginatedUsersDTO } from "../dtos/paginated-users.dto";
import { UserEntity } from "../entities/user.entity";
import { FilterTableMessagesHelper } from "src/utils/messages.helps";

@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject('UsersRepositoryContract')
        private repository: UsersRepositoryContract
    ) { }


    // private async getUnifildFSearsh(value: string){
    //    return await this.repository.findByUnifiedValueSearch(value);
    // }

    private async getAllUserPaginated({ skip, take, page }: PaginatedData) {
        const { users, total } = await this.repository.findAllUsersWithPagination({
            skip, take, page
        });
        const goal = paginateResponse({ total, page, take });
        return { users, ...goal }
    }

    //]
    private async searchUsersWithDateColumn({
        value,
        take,
        skip,
        page,
        // column,
    }: PaginationOptionsSearch) {
        const { users, total } =
            await this.repository.searchUsersCaseFormatDate(
                { take, skip, page },
                {value},
            //   {column, value},
            );
        const goal = paginateResponse({ total, page, take });
        return { users, ...goal };
    }
    //

    public async getUsers(
      { value,
        // column,
        // , isPaginated
    }: SearchFilterTable,
        pageNumber: number
    ): Promise<PaginatedUsersDTO | UserEntity[]> {
        const { skip, take, page } = getParametersToPaginate(pageNumber);

        if (!value) {
            return this.getAllUserPaginated({ page, skip, take });
        }
        // if (value) {
        //     return this.getUnifildFSearsh(value);
        // }

        return this.searchUsersWithDateColumn({
            // column,
            page,
            skip,
            take,
            value,
        });

    }

}