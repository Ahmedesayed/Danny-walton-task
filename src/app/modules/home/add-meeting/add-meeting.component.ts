import { MeetingsService } from './../meetings.service';
import { IMeeting } from './../../../models/imeeting';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CustomValidators } from '@app/helpers/validators';
import { UserService } from '@app/@shared/services/user/user.service';
import { IUser } from '@app/models/iuser';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.scss'],
})
export class AddMeetingComponent implements OnInit {
  meeting: IMeeting | undefined;
  formGroup: FormGroup = new FormGroup({});
  loading: boolean = false;
  users: IUser[] = [];
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private meetingSrvc: MeetingsService,
    public userSrvc:UserService
  ) {}

  ngOnInit(): void {
    this.meeting = this.dynamicDialogConfig.data;
    this.setForm();
    this.getUsers();
  }

  getUsers() {
    this.userSrvc.fetch().subscribe((e)=>{
      this.users = e;
    })
  }

  setForm() {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(this.meeting?.title, { validators: [Validators.required] }),
        start: new FormControl( new Date(this.meeting?.start!) , { validators: [Validators.required] }),
        end: new FormControl(new Date(this.meeting?.end!), {
          validators: [Validators.required],
        }),
        participents: new FormControl(this.meeting?.participents || [], {
          validators: [Validators.required],
        }),
       description : new FormControl(this.meeting?.description, {
        validators: [Validators.required],
      }),
      },
      CustomValidators.mustIncrease('start', 'end')
    );
  }

  add() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    this.loading = true;
    this.meetingSrvc
      .create(this.formGroup.value)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((meeting) => {
        this.dynamicDialogRef.close({ meeting });
      });
  }

  update() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    this.loading = true;
    this.meetingSrvc
      .update({...this.meeting,...this.formGroup.value})
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((meeting) => {
        this.dynamicDialogRef.close({ meeting });
      });
  }
}
