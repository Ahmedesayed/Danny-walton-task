import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@app/@shared/shared-components.module';
import { InfoToolbarComponent } from './profile/info-toolbar/info-toolbar.component';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AlertsNotificationsComponent } from './profile/general/alerts-notifications/alerts-notifications.component';
import { ChangePasswordComponent } from './profile/general/change-password/change-password.component';
import { GeneralComponent } from './profile/general/general.component';
import { MyProfileComponent } from './profile/general/my-profile/my-profile.component';
import { UpdatePasswordComponent } from './profile/general/change-password/update-password/update-password.component';
import { PasswordModule } from 'primeng/password';
import { AddEmailPhoneComponent } from './profile/general/my-profile/add-email-phone/add-email-phone.component';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { CountPrefixPipe } from './profile/general/my-profile/count-prefix.pipe';
import { ImageUploaderComponent } from './profile/info-toolbar/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    ProfileComponent,
    GeneralComponent,
    InfoToolbarComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    AlertsNotificationsComponent,
    UpdatePasswordComponent,
    AddEmailPhoneComponent,
    CountPrefixPipe,
    ImageUploaderComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    SharedComponentsModule,
    SkeletonModule,
    AvatarModule,
    ButtonModule,
    InputSwitchModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    MenuModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
