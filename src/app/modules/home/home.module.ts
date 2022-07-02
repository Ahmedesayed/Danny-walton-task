import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponentRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedComponentsModule } from 'src/app/@shared/shared-components.module';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeComponentRoutingModule,
    SharedComponentsModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    ScrollTopModule,
    SkeletonModule,
    CalendarModule,
    FormsModule,
    ProgressBarModule,
    SelectButtonModule,
    MultiSelectModule,
    StepsModule,
  ],
})
export class HomeComponentModule {}
