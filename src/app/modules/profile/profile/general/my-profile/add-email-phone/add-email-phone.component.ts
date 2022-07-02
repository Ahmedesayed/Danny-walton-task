import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import { PhoneHandler } from '@app/helpers/phoneNumber';
import { CustomValidators } from '@app/helpers/validators';
import {
  IUserEmail,
  IUserPhoneNumber,
} from '@app/modules/profile/models/iuser';
import { ProfileService } from '@app/modules/profile/profile.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-email-phone',
  templateUrl: './add-email-phone.component.html',
  styleUrls: ['./add-email-phone.component.scss'],
})
export class AddEmailPhoneComponent implements OnInit {
  type: 'email' | 'phone' = this.dynamicDialogConfig.data.type;
  value: string = this.dynamicDialogConfig.data.value;
  loading: boolean = false;
  countryCode: string = PhoneHandler.countryCode;
  form: FormGroup = new FormGroup({});
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private profileSrvc: ProfileService,
    private alerSrvc: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({
      [this.type]:
        this.type == 'email'
          ? [this.value, [Validators.required, Validators.email]]
          : this.formBuilder.array(
              PhoneHandler.getPhoneArray(this.value || '').map((e) => [
                e,
                [Validators.required],
              ]),
              // CustomValidators.PhoneNumberValidator()
            ),
    });
  }

  close() {
    this.dynamicDialogRef.close();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.loading = true;
    if (this.type === 'email') this.submitEmail();
    else this.submitPhoneNumber();
  }

  submitEmail() {
    let obs = this.value
      ? this.profileSrvc.updateEmail({
          newEmail: this.form.value.email,
          email: this.value,
        } as IUserEmail)
      : this.profileSrvc.addEmail(this.form.value.email);
    obs.pipe(finalize(() => (this.loading = false))).subscribe(() => {
      this.onSubmit();
    });
  }

  submitPhoneNumber() {
    let obs = this.value
      ? this.profileSrvc.updatePhoneNumber({
          newPhoneNumber: this.form.value.phone.join(''),
          phoneNumber: this.value,
        } as IUserPhoneNumber)
      : this.profileSrvc.addPhoneNumber(this.form.value.phone.join(''));
    obs.pipe(finalize(() => (this.loading = false))).subscribe(() => {
      this.onSubmit();
    });
  }

  onSubmit() {
    this.close();
    this.alerSrvc.showToast({
      summary: `${this.type === 'email' ? 'Email' : 'Phone Number'} ${
        this.value ? 'updated' : 'added'
      } successfully!`,
    });
  }
}
