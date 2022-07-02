import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit {
  fromDate: Date | null = null;
  toDate: Date | null = null;
  @Output() onDateChange: EventEmitter<any> =
    new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  emitDateChange() {
    this.onDateChange.emit({
      startTime: this.fromDate?.getTime() || 0,
      endTime: this.toDate?.getTime() || 0,
    });
  }

  onClearDate(key: 'from' | 'to') {
    if (key == 'from') this.fromDate = null;
    else this.toDate = null;
    this.emitDateChange();
  }
}
