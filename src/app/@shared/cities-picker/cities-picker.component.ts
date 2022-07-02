import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  forwardRef,
} from '@angular/core';
import { finalize } from 'rxjs';
import { ICity } from './city/icity';
import { CoreService } from '../services/core.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-cities-picker',
  templateUrl: './cities-picker.component.html',
  styleUrls: ['./cities-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CitiesPickerComponent),
    },
  ],
})
export class CitiesPickerComponent implements OnInit, ControlValueAccessor {
  cities: ICity[] = [];
  loading: boolean = false;
  @Output() onCityChange: EventEmitter<any[]> = new EventEmitter();
  @Input() optionValue: string = 'name';
  selectedItems: (number | string)[] = [];
  onChange = (code: (string | number)[]) => {};
  onTouched = () => {};
  disabled = false;
  touched = false;

  constructor(private coreSrvc: CoreService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.coreSrvc
      .getCities()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((data) => {
        this.cities = data;
      });
  }

  set value(val: (string | number)[]) {
    this.selectedItems = val;
    this.onCityChange.emit(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(val: (string | number)[]): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  onCityChanged(data: (string | number)[]) {
    this.value = data;
  }
}
