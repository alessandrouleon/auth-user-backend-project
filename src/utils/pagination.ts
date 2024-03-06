
export interface ISearchWithColumn {
    value: string;
    // column: string;
  }

  export class PaginatedData {
    total?: number;
    page: number;
    take: number;
    skip?: number;
  }

  //
  export class PaginationOptions {
    skip: number;
    take: number;
    page: number;
  }

  export class PaginationOptionsSearch extends PaginationOptions {
    value: string;
    // column: string;
  }
  
  //
  export const paginateResponse = ({ total, page, take }: PaginatedData) => {
    const lastPage = Math.ceil(total / take);
    const nextPage = page < lastPage && page + 1;
    const prevPage = page > 1 && page - 1;
    return { total, currentPage: page, nextPage, prevPage, lastPage };
  };
  
  export function getParametersToPaginate(
    page: number,
    take: number = 11,
  ): { take: number; skip: number; page: number } {
    return { page: Number(page) || 1, skip: (Number(page) - 1) * take, take };
  }