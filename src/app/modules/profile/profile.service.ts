import { Injectable } from '@angular/core';
import { ApiService } from '@app/@shared/services/api/api.service';
import { CRUD } from '@app/@shared/services/api/Crud';
import { first, tap } from 'rxjs';
import { IUser, IUserEmail, IUserPhoneNumber } from './models/iuser';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends CRUD<IUser> {
  user: User = new User();
  constructor(apiSrvc: ApiService) {
    super(apiSrvc, 'profile');
  }

  fetchProfile() {
    return this.fetchRoute<IUser>(`${this.apiRoute}`).pipe(
      tap((data) => (this.user = new User(data)))
    );
  }

  updateProfile(context: {
    firstName: string;
    lastName: string;
    imageUrl: string;
  }) {
    return this.apiSrvc.put<IUser>(this.apiRoute, context).pipe(
      first(),
      tap((data) => (this.user = new User(data)))
    );
  }

  addEmail(emailAddress: string) {
    return this.apiSrvc
      .post<IUserEmail[]>(`${this.apiRoute}/emailAddress`, { emailAddress })
      .pipe(
        first(),
        tap(
          (data) => (this.user.emails = <IUserEmail[]>User.sortByPrimary(data))
        )
      );
  }

  deleteEmail(emailAddress: string) {
    return this.apiSrvc
      .delete<IUserEmail[]>(`${this.apiRoute}/emailAddress`, { emailAddress })
      .pipe(
        first(),
        tap(
          (data) => (this.user.emails = <IUserEmail[]>User.sortByPrimary(data))
        )
      );
  }

  updateEmail(email: IUserEmail) {
    return this.apiSrvc
      .put<IUserEmail[]>(`${this.apiRoute}/emailAddress`, {
        existingEmail: email.email,
        newEmail: email.newEmail,
      })
      .pipe(
        first(),
        tap(
          (data) => (this.user.emails = <IUserEmail[]>User.sortByPrimary(data))
        )
      );
  }

  setPrimaryEmail(emailAddress: string) {
    return this.apiSrvc
      .put<IUserEmail[]>(`${this.apiRoute}/emailAddress/primary`, {
        emailAddress,
      })
      .pipe(
        first(),
        tap(
          (data) => (this.user.emails = <IUserEmail[]>User.sortByPrimary(data))
        )
      );
  }

  addPhoneNumber(phonenumber: string) {
    return this.apiSrvc
      .post<IUserPhoneNumber[]>(`${this.apiRoute}/phoneNumber`, { phonenumber })
      .pipe(
        first(),
        tap(
          (data) =>
            (this.user.phoneNumbers = <IUserPhoneNumber[]>(
              User.sortByPrimary(data)
            ))
        )
      );
  }

  updatePhoneNumber(phone: IUserPhoneNumber) {
    return this.apiSrvc
      .put<IUserPhoneNumber[]>(`${this.apiRoute}/phoneNumber`, {
        existingPhoneNumber: phone.phoneNumber,
        newPhoneNumber: phone.newPhoneNumber,
      })
      .pipe(
        first(),
        tap(
          (data) =>
            (this.user.phoneNumbers = <IUserPhoneNumber[]>(
              User.sortByPrimary(data)
            ))
        )
      );
  }

  deletePhoneNumber(phonenumber: string) {
    return this.apiSrvc
      .delete<IUserPhoneNumber[]>(`${this.apiRoute}/phoneNumber`, {
        phonenumber,
      })
      .pipe(
        first(),
        tap(
          (data) =>
            (this.user.phoneNumbers = <IUserPhoneNumber[]>(
              User.sortByPrimary(data)
            ))
        )
      );
  }

  setPrimaryPhoneNumber(phonenumber: string) {
    return this.apiSrvc
      .put<IUserPhoneNumber[]>(`${this.apiRoute}/phoneNumber/primary`, {
        phonenumber,
      })
      .pipe(
        first(),
        tap(
          (data) =>
            (this.user.phoneNumbers = <IUserPhoneNumber[]>(
              User.sortByPrimary(data)
            ))
        )
      );
  }
}
