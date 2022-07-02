import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import { AuthService } from '../auth.service';
import { CredentialsService } from '../credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  credentials: any = {};
  error: string | undefined;

  constructor(
    private authSrvc: AuthService,
    private alertSrvc: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private credentialsService: CredentialsService
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
    // if the user using phone number
    // and there is no + in front of the number -> add it
    const phone = this.formGroup.get('username')?.value;
    if (phone * 1 && phone[0] !== '+') {
      this.formGroup.get('username')?.setValue(`+${phone}`);
    }

    this.isLoading = true;
    this.authSrvc
      .login(this.formGroup.value)
      .pipe(
        finalize(() => {
          this.formGroup.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials: any) => {
          // TODO do the OPT here
          this.credentials = credentials;
          this.completeLogin(credentials);
        },
        (error: any) => {
          this.error = error;
        }
      );
  }
  private completeLogin(credentials: any) {
    this.saveCredentials(credentials);
    this.router.navigateByUrl(this.getReturnUrl());
  }

  private saveCredentials(credentials: any) {
    const data = {
      username: this.formGroup.get('username')?.value,
      token: credentials.access_token,
      companyId: '0',
      refreshToken: credentials.refresh_token,
      companyName: credentials.companyName,
      phoneNumber: credentials.phoneNumber,
      email: credentials.email,
    };
    this.credentialsService.setCredentials(data, true);
  }

  private getReturnUrl() {
    return this.route.snapshot.queryParams['returnUrl'] || '/';
  }
}
