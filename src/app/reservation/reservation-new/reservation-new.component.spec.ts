import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationNewComponent } from './reservation-new.component';

describe('ReservationNewComponent', () => {
  let component: ReservationNewComponent;
  let fixture: ComponentFixture<ReservationNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationNewComponent]
    });
    fixture = TestBed.createComponent(ReservationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
