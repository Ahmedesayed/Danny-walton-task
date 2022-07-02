import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-card',
  templateUrl: './navigation-card.component.html',
  styleUrls: ['./navigation-card.component.scss'],
})
export class NavigationCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() icon: string = '';
  @Input() isLoading: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
