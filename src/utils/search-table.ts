import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { FilterTableMessagesHelper } from './messages.helps';

export class SearchFilterTable {
  @IsString({
    message: FilterTableMessagesHelper.LINES_LIST_WITH_COLUMN_IS_STRING,
  })
  @IsOptional()
  @Matches(/^[a-zA-Z0-9]*([a-zA-Z0-9 ]*[a-zA-Z0-9])?$/, {
    message: FilterTableMessagesHelper.EMPTY_COLUMN_FILTER,
  })
  column: string;

  @IsString({
    message: FilterTableMessagesHelper.LINES_LIST_WITH_VALUE_IS_STRING,
  })
  @IsOptional()
  @Matches(/^[a-zA-Z0-9]*([a-zA-Z0-9 ]*[a-zA-Z0-9])?$/, {
    message: FilterTableMessagesHelper.EMPTY_VALUE_FILTER,
  })
  value: string;

  // @IsBoolean({
  //   message:
  //     FilterTableMessagesHelper.LINES_LIST_WITH_IS_PAGINATED_MUST_BE_BOOLEAN,
  // })
  // @IsOptional()
  // isPaginated: boolean;
}
