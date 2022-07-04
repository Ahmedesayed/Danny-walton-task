import { UserService } from './../../../@shared/services/user/user.service';
import { Utils } from 'src/app/helpers/utils';
import { AuthService } from '@app/modules/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '@app/helpers/validators';
import { finalize } from 'rxjs';
import { IUser } from '@app/models/iuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  constructor(private authSrvc: AuthService, private userSrvc: UserService) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.formGroup = new FormGroup(
      {
        firstName: new FormControl('', { validators: [Validators.required] }),
        lastName: new FormControl('', { validators: [Validators.required] }),
        username: new FormControl('', {
          validators: [Validators.required],
          asyncValidators: [
            CustomValidators.userNameExistsValidator(this.userSrvc),
          ],
          updateOn: 'blur',
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
          asyncValidators: [
            CustomValidators.emailExistsValidator(this.userSrvc),
          ],
          updateOn: 'blur',
        }),
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/
            ),
          ],
        }),
        passwordConfirmation: new FormControl('', {
          validators: [Validators.required],
        }),
        captcha: new FormControl(false, { validators: [] }),
      },
      CustomValidators.mustMatch('password', 'passwordConfirmation')
    );
  }

  signup() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.authSrvc
      .signup(this.mapValues())
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe();
  }

  mapValues() {
    const formValue = this.formGroup.value;
    formValue.password = Utils.hashStr(formValue.password);
    formValue.email = formValue.email.toLowerCase();
    delete formValue.passwordConfirmation;
    return formValue as IUser;
  }

  onCaptcha(ev: any) {
    console.log(ev);
  }
}
