import * as bcrypt from 'bcryptjs';
export class Utils {
  constructor() {}

  public static hashStr(str:string){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(str, salt);
  }
}
