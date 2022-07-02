import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-stepper-menu-ctn',
  templateUrl: './stepper-menu-ctn.component.html',
  styleUrls: ['./stepper-menu-ctn.component.scss'],
})
export class StepperMenuCtnComponent implements OnInit {
  @Input() title: string = '';
  @Input() selectBtns: SelectItem[] = [];
  @Input() progress: number = 0;
  @Input() selectedBtn: string = '';
  @Output() onSelectBtn: EventEmitter<string> = new EventEmitter();
  @Input() isProgressive: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
