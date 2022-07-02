import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsNotificationsComponent } from './alerts-notifications.component';

describe('AlertsNotificationsComponent', () => {
  let component: AlertsNotificationsComponent;
  let fixture: ComponentFixture<AlertsNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertsNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});