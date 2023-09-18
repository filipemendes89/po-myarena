import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PeopleWidgetComponent } from './people-widget.component'

describe('PeopleWidgetComponent', () => {
  let component: PeopleWidgetComponent;
  let fixture: ComponentFixture<PeopleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
