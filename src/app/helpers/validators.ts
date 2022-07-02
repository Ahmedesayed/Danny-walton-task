import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';
import { PhoneHandler } from './phoneNumber';

export class CustomValidators {
  static mustMatch(controlName: string, matchingControlName: string) : ValidatorFn{
    return (formGroup: AbstractControl) => {
      const control =  formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      // set error on matchingControl if validation fails
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ mustMatch: true });
      } else {
        matchingControl?.setErrors(null);
      }
      return null;
    };
  }

  static mustIncrease(
    controlName: string,
    increasingControlName: string
  ): ValidationErrors | null {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const increasingControl = formGroup.controls[increasingControlName];

      if (
        increasingControl.errors &&
        !increasingControl.errors['mustIncrease']
      ) {
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value >= increasingControl.value) {
        increasingControl.setErrors({ mustIncrease: true });
      } else {
        increasingControl.setErrors(null);
      }
      return null;
    };
  }

  static convertDateToTime(): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (typeof value === 'object')
        control.setValue(moment(control.value).format('HH:MM'));
      return null;
    };
  }

  // public static checkPhoneNumber(code: string, phone: string) {
  //   if (code === PhoneHandler.countryCode && phone.startsWith('0')) {
  //     return false;
  //   }
  //   // contains invalid characters
  //   if (
  //     phone.indexOf(' ') !== -1 ||
  //     phone.indexOf('-') !== -1 ||
  //     phone.indexOf('(') !== -1
  //   ) {
  //     return false;
  //   }

  //   return PhoneHandler.isValidNumber(`${code}${phone}`);
  // }

  // public static PhoneNumberValidator() {
  //   return (control: AbstractControl) => {
  //     let code = control.get('0')!;
  //     let phone = control.get('1')!;
  //     if (!this.checkPhoneNumber(code.value, phone.value))
  //       phone.setErrors({ wrongNumber: { value: control.value } });

  //     return null;
  //   };
  // }
}
