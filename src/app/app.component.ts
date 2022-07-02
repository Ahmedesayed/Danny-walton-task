import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.enableRipple();
  }

  enableRipple() {
    this.primengConfig.ripple = true;
  }
}
