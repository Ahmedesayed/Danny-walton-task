import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { ICity } from '../cities-picker/city/icity';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  globalSearchEvent: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private apiSrvc: ApiService) {}

  get globalSearchObservable() {
    return this.globalSearchEvent.asObservable();
  }

  getCities() {
    return this.apiSrvc.get<ICity[]>('configuration/cities').pipe(first());
  }

}
