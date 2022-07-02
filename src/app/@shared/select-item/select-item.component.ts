import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() key: string = '';
  @Input() selected: any;
  @Input() isLoading: boolean = false;
  @Input() isRadioBtn: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
