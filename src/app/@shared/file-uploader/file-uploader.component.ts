import { HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { switchMap, tap } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';
import { ApiService } from '../services/api/api.service';
import { IStorageContainer } from '../services/storage/istorage-container';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FileUploaderComponent),
    },
  ],
})
export class FileUploaderComponent implements OnInit, ControlValueAccessor {
  @Input() subUrlPath: string = '';
  @Input() title: string = 'Upload files';
  @Input() required: boolean = false;
  @Output() onUploadEv: EventEmitter<string> = new EventEmitter<string>();
  onChange = (file: string) => {};
  onTouched = (file: string) => {};
  disabled = false;
  uploadUrl: string = '';
  uploadedFileUrl: string = '';
  fileThumbnail: string = '';
  @ViewChild('uploader', {}) uploadCmp: FileUpload = {} as FileUpload;
  constructor(private apiSrvc: ApiService, private alertSrvc: AlertService) {}

  ngOnInit(): void {}

  set value(val: string) {
    this.uploadedFileUrl = val;
    if (val)
      this.fileThumbnail =
        val.split('.').pop() === 'pdf'
          ? 'assets/images/pdf-placeholder.png'
          : val;
    this.onChange(val);
    this.onTouched(val);
  }

  getUploadProps() {
    return this.apiSrvc
      .get<IStorageContainer>(`${this.subUrlPath}/storagecontainer`)
      .pipe(tap(() => this.updateProgress(10)));
  }

  writeValue(file: string): void {
    this.value = file;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  clear(event: any) {
    this.alertSrvc.confirmPopup({
      acceptCallback: () => {
        this.value = '';
      },
      event,
    });
  }

  onUploaded() {
    this.value = this.uploadUrl.split('?')[0];
    this.uploadCmp.clear();
    this.onUploadEv.emit(this.value);
  }

  myUploader(files: File[]) {
    this.getUploadProps()
      .pipe(
        switchMap((data) =>
          this.apiSrvc.upload(...this.getUploadFnParams(data, files[0]))
        )
      )
      .subscribe(
        (data) => {
          this.updateProgress(data as number);
        },
        () => {},
        () => {
          this.onUploaded();
        }
      );
  }

  updateProgress(progress: number) {
    this.uploadCmp.progress = progress;
    this.uploadCmp.cd.detectChanges();
  }

  getUploadFnParams(uploadUrlProps: IStorageContainer, file: File) {
    let result: [string, File, HttpHeaders],
      name = `${Date.now()}.${file.name.split('.').pop()}`,
      headers = new HttpHeaders({
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': file.type,
        accept: file.type,
      });
    this.uploadUrl = `${uploadUrlProps?.storage}/${name}?${uploadUrlProps?.queryToken}`;
    result = [this.uploadUrl, file, headers];
    return result;
  }
}
