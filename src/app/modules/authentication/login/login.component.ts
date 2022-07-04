import { AlertService } from './../../../@shared/services/alert/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private authSrvc: AuthService,
    private alertSrvc:AlertService
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  login() {
    this.formGroup.markAllAsTouched()
    if(this.formGroup.invalid) return;
    this.isLoading = true;
    this.authSrvc
      .login(this.formGroup.value)
      .pipe(
        finalize(() => {
          this.formGroup.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe((e)=>{
        if(!e) this.alertSrvc.showToast({severity:'error',summary:'Username/Email or password is wrong!'})
      });
  }

}
