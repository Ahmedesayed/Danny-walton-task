import { MultiSelectModule } from 'primeng/multiselect';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponentRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedComponentsModule } from 'src/app/@shared/shared-components.module';
import { ButtonModule } from 'primeng/button';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMeetingComponent } from './add-meeting/add-meeting.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [HomeComponent, AddMeetingComponent, MeetingDetailsComponent],
  imports: [
    CommonModule,
    HomeComponentRoutingModule,
    SharedComponentsModule,
    ButtonModule,
    ScrollTopModule,
    SkeletonModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    InputTextareaModule,
    MultiSelectModule,
  ],
})
export class HomeComponentModule {}
