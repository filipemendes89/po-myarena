import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersClassListComponent } from './members-class-list.component';

describe('MembersClassListComponent', () => {
  let component: MembersClassListComponent;
  let fixture: ComponentFixture<MembersClassListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersClassListComponent]
    });
    fixture = TestBed.createComponent(MembersClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
