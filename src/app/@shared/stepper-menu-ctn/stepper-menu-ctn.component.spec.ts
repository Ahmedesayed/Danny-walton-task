import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperMenuCtnComponent } from './stepper-menu-ctn.component';

describe('StepperMenuCtnComponent', () => {
  let component: StepperMenuCtnComponent;
  let fixture: ComponentFixture<StepperMenuCtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperMenuCtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperMenuCtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
