import { CredentialsService } from '@app/@shared/services/credentials/credentials.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/modules/authentication/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [

    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => this.authSrvc.logout(),
    },
  ];
  isMenuVisible: boolean = false;
  constructor(
    public router: Router,
    private authSrvc: AuthService,
    public credentialsSrvc:CredentialsService
  ) {}

  ngOnInit(): void {
  }





}
