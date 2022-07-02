import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesPickerComponent } from './cities-picker.component';

describe('CitiesPickerComponent', () => {
  let component: CitiesPickerComponent;
  let fixture: ComponentFixture<CitiesPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
