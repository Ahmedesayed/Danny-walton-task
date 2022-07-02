import { Injectable } from '@angular/core';
import { StorageKey } from '../storage/storage-key';
import { IUser } from '../../../modules/authentication/models/user/iuser';
import { User } from '../../../modules/authentication/models/user/user';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: IUser = new User();

  constructor(private strgSrvc: StorageService) {
    this.getUserStored();
  }

  saveUser(user: IUser) {
    this._user = new User(user);
    this.strgSrvc.setData(StorageKey.user, user);
  }

  private getUserStored() {
    this._user = new User(this.strgSrvc.getData<IUser>(StorageKey.user));
  }

  get User() {
    return new User(this.strgSrvc.getData<IUser>(StorageKey.user));
  }

  update(user: IUser) {
    let newUser = { ...this._user, ...user };
    this.saveUser(newUser);
  }

  clearUser() {
    this.strgSrvc.clear();
  }
}
