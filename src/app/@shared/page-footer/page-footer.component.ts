import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent implements OnInit {
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
  @Input() label: string = 'CREATE';
  @Input() disabled: boolean = true;
  @Input() isBackEnabled: boolean = false;
  @Input() loading: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
