export interface IPaginatedResponse<T> {
  pageNumber: number;
  pagesCount?: number;
  pageSize: number;
  data: T[];
  totalItemsCount?: number;
}
