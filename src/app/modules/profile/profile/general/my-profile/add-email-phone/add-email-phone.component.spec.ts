import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailPhoneComponent } from './add-email-phone.component';

describe('AddEmailPhoneComponent', () => {
  let component: AddEmailPhoneComponent;
  let fixture: ComponentFixture<AddEmailPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmailPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmailPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
