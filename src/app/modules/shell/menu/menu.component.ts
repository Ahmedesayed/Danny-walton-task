import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AutoUnsubscribe } from '@app/decorators/auto-unsubscribe.decorator';
import { environment } from '@env/environment';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MENU_ITEMS } from './menu-items';
@AutoUnsubscribe()
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = MENU_ITEMS;
  display: boolean = true;
  activeItem: MenuItem = this.setActiveItem(location.pathname);
  version = environment.version;
  routerSubs: Subscription | undefined;
  constructor(private router: Router) {}

  ngOnInit() {
    this.subscribeToNavigation();
  }

  private subscribeToNavigation() {
    this.routerSubs = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((nav) => {
        let ev = nav as NavigationEnd;
        this.setActiveItem(ev.url);
      });
  }

  private setActiveItem(url: string) {
    return (this.activeItem =
      this.items.find((e) => url.includes(e.routerLink) && e.routerLink) ||
      this.items[0]);
  }

  ngOnDestroy() {}
}
