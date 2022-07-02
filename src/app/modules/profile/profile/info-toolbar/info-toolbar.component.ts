import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '@app/@shared/services/alert/alert.service';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@Component({
  selector: 'app-info-toolbar',
  templateUrl: './info-toolbar.component.html',
  styleUrls: ['./info-toolbar.component.scss'],
})
export class InfoToolbarComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() imageUrl: string | undefined;
  @Input() isLoading: boolean = false;
  constructor(private alertSrvc: AlertService) {}

  ngOnInit(): void {}

  openUploadDialog() {
    this.alertSrvc.showCustomDialog({
      cmp: ImageUploaderComponent,
      header: 'UPDATE IMAGE',
      width: '50%',
      data: { type: 'Profile' },
    });
  }
}
