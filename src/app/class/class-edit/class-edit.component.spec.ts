import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassEditComponent } from './class-edit.component';

describe('ClassEditComponent', () => {
  let component: ClassEditComponent;
  let fixture: ComponentFixture<ClassEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassEditComponent]
    });
    fixture = TestBed.createComponent(ClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
