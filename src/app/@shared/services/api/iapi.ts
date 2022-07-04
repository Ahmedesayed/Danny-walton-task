import { Observable } from 'rxjs';

export interface IApi<T> {
  fetch: (page?: any) => Observable<T[]>;
  fetchById: (id: number | string) => Observable<T>;
  create?: (data: any) => Observable<T>;
  update?: (data: T) => Observable<T>;
  delete?: (ids: number) => Observable<T[]>;
}
