import { AuthService } from '@app/modules/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '@app/helpers/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isLoading : boolean = false;
  constructor(private authSrvc:AuthService) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      username: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required,Validators.email,Validators.pattern('^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}){10,}$')] }),
      password: new FormControl('', { validators: [Validators.required] }),
      passwordConfirmation: new FormControl('', { validators: [Validators.required] }),
    },CustomValidators.mustMatch('password','passwordConfirmation'));
  }

  signup(){
    this.authSrvc.signup(JSON.stringify(this.formGroup.value));
  }

}
