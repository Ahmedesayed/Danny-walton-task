import { AlertService } from './../../../@shared/services/alert/alert.service';
import { MeetingsService } from './../meetings.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { IMeeting } from '@app/models/imeeting';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {
  meeting : IMeeting | undefined;
  constructor(private dynamicDialogRef: DynamicDialogRef,private dynamicDialogConfig:DynamicDialogConfig,private meetingSrvc:MeetingsService,private alertSrvc:AlertService) { }

  ngOnInit(): void {
    this.meeting = this.dynamicDialogConfig.data;
  }

  close(isDeleted:boolean = false){
    this.dynamicDialogRef.close({isDeleted,meeting:this.meeting})
  }

  delete(event:any){
    this.alertSrvc.confirmPopup({
      message: `Are you sure you want to delete the event '${this.meeting?.title}'`,
      acceptCallback: () => {
        this.meetingSrvc.delete(Number(this.meeting?.id)).subscribe(() => {
          this.close(true);
        });
      },
      event: event,
    });
  }

  update(){
    this.alertSrvc.showCustomDialog({
      header: `Update ${this.meeting?.title}`,
      cmp: AddMeetingComponent,
      data :this.meeting
    }).onClose.subscribe((data)=>{
      if(data.meeting)
      this.meeting = data.meeting;
    })
  }


}
