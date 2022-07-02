import { Component, Input, OnInit } from '@angular/core';
import { Credentials } from '@app/modules/authentication/credentials.service';
import { PrimeIcons, SelectItem } from 'primeng/api';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  selectBtns: SelectItem[] = [
    { label: 'My Profile', value: 'my-profile', icon: PrimeIcons.USER },
    // {
    //   label: 'Change Password',
    //   value: 'change-password',
    //   icon: PrimeIcons.KEY,
    // },
    // {
    //   label: 'Alerts & Notifications',
    //   value: 'alerts-notifications',
    //   icon: PrimeIcons.BELL,
    // },
  ];
  selectedBtn: string = 'my-profile';
  progress = 33;
  @Input() isLoading: boolean = false;

  constructor(public profileSrvc: ProfileService) {}

  ngOnInit(): void {}

  onSelectBtn(val: string) {
    this.selectedBtn = val;
  }
}
