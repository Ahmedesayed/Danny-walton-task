import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from 'src/app/modules/authentication/auth.service';
import { CoreService } from '@app/@shared/services/core.service';
import { ProfileService } from '@app/modules/profile/profile.service';
import { filter, Subscription } from 'rxjs';
import { AutoUnsubscribe } from '@app/decorators/auto-unsubscribe.decorator';
@AutoUnsubscribe()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Profile',
      icon: PrimeIcons.USER,
      command: () => this.router.navigateByUrl('profile'),
    },
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => this.authSrvc.logout(),
    },
  ];
  isMenuVisible: boolean = false;
  isBackAvailable: boolean = false;
  searchTerm: string = '';
  searchTimeout: NodeJS.Timeout | undefined;
  queryParamSubs: Subscription | undefined;
  navigationSubs: Subscription | undefined;
  constructor(
    public router: Router,
    private authSrvc: AuthService,
    private coreSrvc: CoreService,
    private activatedRoute: ActivatedRoute,
    public profileSrvc: ProfileService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.checkSearchParam();
    this.subscribeNavigation();
    this.checkBack();
  }

  checkSearchParam() {
    this.queryParamSubs = this.activatedRoute.queryParams.subscribe((data) => {
      this.searchTerm = data['search'] || '';
      this.coreSrvc.globalSearchEvent.next(this.searchTerm);
    });
  }

  subscribeNavigation() {
    this.navigationSubs = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((data) => {
        this.checkBack();
      });
  }

  checkBack() {
    let urls = location.pathname.split('/');
    urls = urls.filter((e) => e);
    this.isBackAvailable = urls.length > 1;
  }

  onBack() {
    let path = location.pathname.split('/');
    path.pop();
    this.router.navigate(path);
  }

  onSearch() {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.coreSrvc.globalSearchEvent.next(this.searchTerm);
      this.router.navigate([], {
        queryParams: this.searchTerm ? { search: this.searchTerm } : {},
      });
    }, 700);
  }

  getData() {
    this.profileSrvc.fetchProfile().subscribe();
  }

  clear() {
    this.searchTerm = '';
    this.onSearch();
  }

  onNotificationClick() {}

  ngOnDestroy() {}
}
