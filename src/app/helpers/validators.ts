import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UserService } from '@app/@shared/services/user/user.service';
import * as moment from 'moment';
import { map } from 'rxjs';

export class CustomValidators {
  static mustMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(controlName);
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

  static emailExistsValidator(user: UserService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return user
        .isUniqueEmail(control.value)
        .pipe(map((valid) => (valid ? null : { emailExists: true })));
    };
  }

  static userNameExistsValidator(user: UserService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return user
        .isUniqueUsername(control.value)
        .pipe(map((valid) => (valid ? null : { userNameExists: true })));
    };
  }
}
