import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    RippleModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    AvatarModule,
    TabMenuModule,
    MenuModule,
    MenubarModule,
    FormsModule,
    SidebarModule,
  ],
})
export class ShellModule {}
