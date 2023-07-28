import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleNewComponent } from './people-new.component';

describe('PeopleNewComponent', () => {
  let component: PeopleNewComponent;
  let fixture: ComponentFixture<PeopleNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
