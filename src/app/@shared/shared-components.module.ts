import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { DateRangeComponent } from './date-range/date-range.component';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { SkeletonModule } from 'primeng/skeleton';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { TextOverflowBtnDirective } from './text-overflow/text-overflow-btn/text-overflow-btn.directive';
import { TextOverflowComponent } from './text-overflow/text-overflow.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    InfoCardComponent,
    DateRangeComponent,
    TextOverflowBtnDirective,
    TextOverflowComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    BadgeModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    RadioButtonModule,
    ScrollPanelModule,
    CalendarModule,
    SelectButtonModule,
    FileUploadModule,
    SkeletonModule,
    MultiSelectModule,
    TableModule,
    TooltipModule,
    CheckboxModule,
    RouterModule,
  ],
  exports: [
    InfoCardComponent,
    DateRangeComponent,
    TextOverflowComponent,
    NotFoundComponent,
  ],
})
export class SharedComponentsModule {}
