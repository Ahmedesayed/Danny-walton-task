import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card/info-card.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { SearchableSelectionListComponent } from './searchable-selection-list/searchable-selection-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectItemComponent } from './select-item/select-item.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { DateRangeComponent } from './date-range/date-range.component';
import { CalendarModule } from 'primeng/calendar';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileUploadModule } from 'primeng/fileupload';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CitiesPickerComponent } from './cities-picker/cities-picker.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CountrycodePickerComponent } from './countrycode-picker/countrycode-picker.component';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { StepperMenuCtnComponent } from './stepper-menu-ctn/stepper-menu-ctn.component';
import { TextOverflowBtnDirective } from './text-overflow/text-overflow-btn/text-overflow-btn.directive';
import { TextOverflowComponent } from './text-overflow/text-overflow.component';
import { RouterModule } from '@angular/router';
import { NavigationCardComponent } from './navigation-card/navigation-card.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    InfoCardComponent,
    SearchableSelectionListComponent,
    SelectItemComponent,
    DateRangeComponent,
    PageHeaderComponent,
    FileUploaderComponent,
    PageFooterComponent,
    CitiesPickerComponent,
    CountrycodePickerComponent,
    StepperMenuCtnComponent,
    TextOverflowBtnDirective,
    TextOverflowComponent,
    NavigationCardComponent,
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
    SearchableSelectionListComponent,
    SelectItemComponent,
    DateRangeComponent,
    PageHeaderComponent,
    FileUploaderComponent,
    PageFooterComponent,
    CitiesPickerComponent,
    CountrycodePickerComponent,
    StepperMenuCtnComponent,
    TextOverflowComponent,
    NavigationCardComponent,
    NotFoundComponent,
  ],
})
export class SharedComponentsModule {}
