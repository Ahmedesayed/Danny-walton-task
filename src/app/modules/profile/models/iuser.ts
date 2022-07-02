export interface IUser {
  firstName: string;
  lastName: string;
  creationDate: string;
  roles: IRole[];
  emails: IUserEmail[];
  phoneNumbers: IUserPhoneNumber[];
  imageUrl: string;
}

export interface IRole {
  name: string;
  permissions: number[];
  id: number;
}

export interface IUserEmail {
  email: string;
  isPrimary: boolean;
  isEditing?: boolean;
  newEmail?: string;
  isLoading?: boolean;
}

export interface IUserPhoneNumber {
  phoneNumber: string;
  isPrimary: boolean;
  isEditing?: boolean;
  newPhoneNumber?: string;
  isLoading?: boolean;
}
