import { IRole, IUser, IUserEmail, IUserPhoneNumber } from './iuser';

export class User implements IUser {
  creationDate: string = '';
  roles: IRole[] = [];
  imageUrl: string = '';
  firstName: string = '';
  lastName: string = '';
  emails: IUserEmail[] = [];
  phoneNumbers: IUserPhoneNumber[] = [];
  fullName: string = '';

  constructor(user?: IUser) {
    if (user) {
      this.emails = <IUserEmail[]>User.sortByPrimary(user.emails);
      this.phoneNumbers = <IUserPhoneNumber[]>(
        User.sortByPrimary(user.phoneNumbers)
      );
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.fullName = [user.firstName, user.lastName].join(' ');
      this.imageUrl = user.imageUrl;
      this.roles = user.roles;
    }
  }


  public static sortByPrimary(arr: IUserPhoneNumber[] | IUserEmail[]) {
    return arr.sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
  }
}
