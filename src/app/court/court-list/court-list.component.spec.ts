import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtListComponent } from './court-list.component';

describe('CourtListComponent', () => {
  let component: CourtListComponent;
  let fixture: ComponentFixture<CourtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
