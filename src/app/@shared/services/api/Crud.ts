import { ApiService } from '@app/@shared/services/api/api.service';
import { first } from 'rxjs';
import { IApi } from './iapi';

export class CRUD<T> implements IApi<T> {
  apiRoute: string = '';
  constructor(protected apiSrvc: ApiService, apiRoute: string) {
    this.apiRoute = apiRoute;
  }

  fetchRoute<T>(route: string, params = {}) {
    return this.apiSrvc.get<T>(route, params).pipe(first());
  }


  fetch(
    params = {}
  ) {
    return this.fetchRoute<T[]>(this.apiRoute, params);
  }

  fetchById(id: string | number) {
    return this.fetchRoute<T>(`${this.apiRoute}/${id}`);
  }

  create(context: any) {
    return this.apiSrvc.post<T>(this.apiRoute, context).pipe(first());
  }

  update(data: any) {
    return this.apiSrvc
      .put<T>(`${this.apiRoute}`, data)
      .pipe(first());
  }

  delete(id: number) {
    return this.apiSrvc.delete<T[]>(this.apiRoute + '/' + id).pipe(first());
  }
}
