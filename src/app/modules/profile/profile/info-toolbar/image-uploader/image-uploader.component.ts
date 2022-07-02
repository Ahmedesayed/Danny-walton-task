import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import { ProfileService } from '@app/modules/profile/profile.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  type: 'Profile' | 'Company' = this.dynamicDialogConfig.data.type;
  value: string = '';
  loading: boolean = false;
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private profileSrvc: ProfileService,
    private alerSrvc: AlertService
  ) {}

  ngOnInit(): void {}

  close() {
    this.dynamicDialogRef.close();
  }

  submit() {
    this.loading = true;
    let profile = this.profileSrvc.user;
    profile.imageUrl = this.value.split('/').pop()!;
    this.profileSrvc.updateProfile(profile).subscribe(() => {
      this.close();
      this.alerSrvc.showToast({
        summary: `${this.type} image updated successfully!`,
      });
    });
  }
}
