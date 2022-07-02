import { IPaginatedResponse } from '../models/ipaginated-response';

export class Utils {
  constructor() {}


  public static setPaginatedData<T>(
    currentData: IPaginatedResponse<T>,
    data: IPaginatedResponse<T>
  ) {
    currentData.data = [...currentData.data, ...data.data];
    currentData.pageNumber = data.pageNumber;
    currentData.pageSize = data.pageSize;
    currentData.pagesCount = data.pagesCount;
    currentData.totalItemsCount = data.totalItemsCount;
  }
}
