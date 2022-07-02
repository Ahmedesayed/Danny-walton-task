import { ApiService } from '@app/@shared/services/api/api.service';
import { first } from 'rxjs';
import { IApi } from './iapi';
import { IPaginatedResponse } from '../../../models/ipaginated-response';

export class CRUD<T> implements IApi<T> {
  apiRoute: string = '';
  constructor(protected apiSrvc: ApiService, apiRoute: string) {
    this.apiRoute = apiRoute;
  }

  fetchRoute<T>(route: string, params = {}) {
    return this.apiSrvc.get<T>(route, params).pipe(first());
  }

  fetchRoutePaginated<T>(
    route: string,
    pageOptions: { pageNumber?: number; pageSize?: number } = {},
    params = {}
  ) {
    return this.apiSrvc
      .get<IPaginatedResponse<T>>(route, {
        pageNumber: pageOptions.pageNumber,
        pageSize: pageOptions.pageSize,
        ...params,
      })
      .pipe(first());
  }

  fetch(
    pageOptions: { pageNumber?: number; pageSize?: number } = {},
    params = {}
  ) {
    return this.fetchRoutePaginated<T>(this.apiRoute, pageOptions, params);
  }

  fetchById(id: string | number) {
    return this.fetchRoute<T>(`${this.apiRoute}/${id}`);
  }

  create(context: any) {
    return this.apiSrvc.post<T>(this.apiRoute, context).pipe(first());
  }

  update(data: any) {
    return this.apiSrvc
      .put<T>(`${this.apiRoute}/${data.id}`, data)
      .pipe(first());
  }

  delete(ids: number[]) {
    return this.apiSrvc.delete<boolean>(this.apiRoute, ids).pipe(first());
  }
}
