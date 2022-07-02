import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private alertSrvc: AlertService) {}

  ngOnInit(): void {}

  update() {
    this.alertSrvc.showCustomDialog({
      header: 'UPDATE PASSWORD',
      cmp: UpdatePasswordComponent,
      width: '50%',
      data: { id: 0 },
    });
  }
}
