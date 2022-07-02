import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import {
  IUserEmail,
  IUserPhoneNumber,
} from '@app/modules/profile/models/iuser';
import { ProfileService } from '@app/modules/profile/profile.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { finalize } from 'rxjs';
import { AddEmailPhoneComponent } from './add-email-phone/add-email-phone.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() emails: IUserEmail[] = [];
  @Input() phoneNumbers: IUserPhoneNumber[] = [];
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  emailMenu: MenuItem[] = [
    {
      label: 'Edit Email',
      icon: PrimeIcons.ENVELOPE,
      command: () => {
        this.addEmail(this.selectedItem.email);
      },
    },
    {
      label: 'Set as primary',
      icon: PrimeIcons.BOOKMARK_FILL,
      command: () => {
        this.profileSrvc.setPrimaryEmail(this.selectedItem.email).subscribe();
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      styleClass: 'button-danger',
      command: (event) => {
        this.alertSrvc.confirmDialog({
          event,
          header: this.selectedItem.email,
          acceptCallback: () =>
            this.profileSrvc.deleteEmail(this.selectedItem.email).subscribe(),
        });
      },
    },
  ];
  editMenu: MenuItem[] = [];
  phoneNumberMenu: MenuItem[] = [
    {
      label: 'Edit Phone Number',
      icon: PrimeIcons.ENVELOPE,
      command: () => {
        this.addPhoneNumber(this.selectedItem.phoneNumber)
      },
    },
    {
      label: 'Set as primary',
      icon: PrimeIcons.BOOKMARK_FILL,
      command: () => {
        this.profileSrvc
          .setPrimaryEmail(this.selectedItem.phoneNumber)
          .subscribe();
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      styleClass: 'button-danger',
      command: (event) => {
        this.alertSrvc.confirmDialog({
          event,
          header: this.selectedItem.phoneNumber,
          acceptCallback: () =>
            this.profileSrvc
              .deletePhoneNumber(this.selectedItem.phoneNumber)
              .subscribe(),
        });
      },
    },
  ];
  selectedItem: any;
  editable: boolean = false;
  editLoading: boolean = false;
  constructor(
    private alertSrvc: AlertService,
    private profileSrvc: ProfileService
  ) {}

  ngOnInit(): void {}

  edit() {
    if (this.editable) this.save();
    else this.editable = !this.editable;
  }

  save() {
    this.editLoading = true;
    this.profileSrvc
      .updateProfile({
        firstName: this.firstName,
        lastName: this.lastName,
        imageUrl: this.profileSrvc.user.imageUrl,
      })
      .pipe(finalize(() => (this.editLoading = false)))
      .subscribe(() => (this.editable = false));
  }

  addEmail(existingEmail ?: string) {
    this.alertSrvc.showCustomDialog({
      cmp: AddEmailPhoneComponent,
      header: 'ADD EMAIL',
      data: { type: 'email',value:existingEmail },
      width: '50%',
    });
  }

  saveEmail(email: IUserEmail) {
    email.isLoading = true;
    this.profileSrvc
      .updateEmail(email)
      .pipe(finalize(() => (email.isLoading = false)))
      .subscribe(() => {
        email.isEditing = false;
        this.alertSrvc.showToast({ summary: 'Email Updated successfully!' });
      });
  }

  addPhoneNumber(existingPhone ?:string) {
    this.alertSrvc.showCustomDialog({
      cmp: AddEmailPhoneComponent,
      header: 'ADD PHONE NUMBER',
      data: { type: 'phone', value: existingPhone },
      width: '50%',
    });
  }

  savePhoneNumber(phoneNumber: IUserPhoneNumber) {
    phoneNumber.isLoading = true;
    this.profileSrvc
      .updatePhoneNumber(phoneNumber)
      .pipe(finalize(() => (phoneNumber.isLoading = false)))
      .subscribe(() => {
        phoneNumber.isEditing = false;
        this.alertSrvc.showToast({
          summary: 'Phone Number Updated successfully!',
        });
      });
  }

  checkDeleteItem(isPrimary: boolean, items: MenuItem[]) {
    items[1].visible = !isPrimary;
    items[2].disabled = isPrimary;
  }

  checkEditItem(items: MenuItem[], item: IUserEmail | IUserPhoneNumber) {
    items[0].visible = !item.isEditing;
  }

  setMenuSelectedItem(item: IUserEmail | IUserPhoneNumber) {
    item.isEditing = item.isEditing || false;
    if ('email' in item) {
      item.newEmail = item.email;
    } else {
      item.newPhoneNumber = item.phoneNumber;
    }
    this.selectedItem = item;
  }
}
