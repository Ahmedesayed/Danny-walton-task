import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@app/helpers/validators';
import { ProfileService } from '@app/modules/profile/profile.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private profileSrvc: ProfileService,
    private dynamicDialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        passwordConfirmation: ['', [Validators.required]],
        oldPassword: ['', [Validators.required]],
      },
      {
        validator: CustomValidators.mustMatch(
          'password',
          'passwordConfirmation'
        ),
      }
    );
  }

  close() {
    this.dynamicDialogRef.close();
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    this.close();
  }
}
