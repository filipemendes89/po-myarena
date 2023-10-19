import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersClassNewComponent } from './members-class-new.component';

describe('MembersClassNewComponent', () => {
  let component: MembersClassNewComponent;
  let fixture: ComponentFixture<MembersClassNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersClassNewComponent]
    });
    fixture = TestBed.createComponent(MembersClassNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
