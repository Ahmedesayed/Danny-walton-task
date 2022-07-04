import { IMeeting } from './../../../models/imeeting';
import { AlertService } from './../../../@shared/services/alert/alert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { MeetingsService } from '../meetings.service';
import { AddMeetingComponent } from '../add-meeting/add-meeting.component';
import { MeetingDetailsComponent } from '../meeting-details/meeting-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  options: CalendarOptions = {
    initialDate: Date.now(),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  @ViewChild('calendar', {}) calendar: FullCalendarComponent | undefined;
  lastSelectedDate: string = '';
  currentEvents: EventApi[] = [];
  meetings: IMeeting[] = [];

  constructor(
    private meetingSrvc: MeetingsService,
    private alertSrvc: AlertService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getMeetings();
  }

  getMeetings() {
    this.meetingSrvc.fetch().subscribe((data) => {
      this.meetings = data;
      this.options.events = data as EventInput;
    });
  }

  addEvents(data: EventInput[]) {
    data.forEach((e) => {
      this.calendar?.getApi().addEvent(e);
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    if (this.lastSelectedDate == selectInfo.startStr) return;
    this.lastSelectedDate = selectInfo.startStr;
    const calendarApi = selectInfo.view.calendar;
    this.alertSrvc
      .showCustomDialog({
        header: `Add Meeting Info from ${selectInfo.startStr}  ${
          selectInfo.endStr ? '- ' + selectInfo.endStr : ''
        }`,
        data: { start: selectInfo.start, end: selectInfo.end },
        cmp: AddMeetingComponent,
      })
      .onClose.subscribe((data) => {
        if(data.meeting){
          calendarApi.unselect();
          calendarApi.addEvent(data.meeting);
        }
      });
  }

  handleEventClick(clickInfo: EventClickArg) {
    let meeting = this.meetings.find(
      (e) => e.id === Number(clickInfo.event.id)
    );
    this.alertSrvc
      .showCustomDialog({
        header: clickInfo.event.title,
        cmp: MeetingDetailsComponent,
        data: meeting,
      })
      .onClose.subscribe((data) => {
        if(data?.meeting){
          clickInfo.event.remove();
          if (data?.isDeleted) {
            return;
          } else {
            clickInfo.view.calendar.addEvent(data.meeting as EventInput);
          }
        }
      });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
