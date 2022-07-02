import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-overflow',
  templateUrl: './text-overflow.component.html',
  styleUrls: ['./text-overflow.component.scss'],
})
export class TextOverflowComponent implements OnInit {
  @Input() text: string | number = '';
  @Input() textSize: string = '16px';
  constructor() {}

  ngOnInit(): void {}
}
