import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrycodePickerComponent } from './countrycode-picker.component';

describe('CountrycodePickerComponent', () => {
  let component: CountrycodePickerComponent;
  let fixture: ComponentFixture<CountrycodePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrycodePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrycodePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
