import { CRUD } from '@app/@shared/services/api/Crud';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { IUser } from '@app/models/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CRUD<IUser> {

  constructor(apiSrvc:ApiService) {
    super(apiSrvc,'users')
  }

  isUniqueEmail(email : string){
    return this.fetchRoute<boolean>(`${this.apiRoute}/email`,{email})
  }

  isUniqueUsername(username : string){
    return this.fetchRoute<boolean>(`${this.apiRoute}/username`,{username})
  }


}
