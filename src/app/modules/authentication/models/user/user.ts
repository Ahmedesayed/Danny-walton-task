import { IUser } from './iuser';

export class User implements IUser {
  id: number = 0;
  userName: string = '';
  firstName: string = '';
  lastName: string = '';
  image: string = '';
  email: string = '';
  resetPassword: boolean = false;
  token: string = '';

  constructor(user?: IUser) {
    if (user) {
      this.userName = user.userName;
      this.email = user.email;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.image = user.image;
      this.id = user.id;
      this.token = user.token;
      this.resetPassword = user.resetPassword;
    }
  }
}
