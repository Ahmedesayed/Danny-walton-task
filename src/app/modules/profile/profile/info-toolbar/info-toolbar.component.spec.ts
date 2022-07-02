import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoToolbarComponent } from './info-toolbar.component';

describe('InfoToolbarComponent', () => {
  let component: InfoToolbarComponent;
  let fixture: ComponentFixture<InfoToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
