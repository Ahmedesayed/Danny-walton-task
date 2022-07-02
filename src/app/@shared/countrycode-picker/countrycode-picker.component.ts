import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { COUNTRIES } from 'src/app/constants/countries';

@Component({
  selector: 'app-countrycode-picker',
  templateUrl: './countrycode-picker.component.html',
  styleUrls: ['./countrycode-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CountrycodePickerComponent),
    },
  ],
})
export class CountrycodePickerComponent
  implements OnInit, ControlValueAccessor
{
  countries = COUNTRIES;
  code: string = '';
  onChange = (code: string) => {};
  onTouched = () => {};
  disabled = false;
  touched = false;

  constructor() {}

  set value(val: string) {
    this.code = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(code: string): void {
    this.value = code;
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

  ngOnInit(): void {}
}
