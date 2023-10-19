import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtNewComponent } from './court-new.component';

describe('CourtNewComponent', () => {
  let component: CourtNewComponent;
  let fixture: ComponentFixture<CourtNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
