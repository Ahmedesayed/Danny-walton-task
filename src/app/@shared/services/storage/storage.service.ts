import { Injectable } from '@angular/core';
import { StorageKey } from './storage-key';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getData<T>(key: StorageKey) {
    let data = localStorage[key];
    return <T>(data ? JSON.parse(data) : null);
  }

  setData(key: StorageKey, value: any) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  appendData<T>(key: StorageKey, value: T) {
    let data = this.getData(key);
    data = { ...(<T>data), ...value };
    this.setData(key, data);
  }

  removeItem(key: StorageKey) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
