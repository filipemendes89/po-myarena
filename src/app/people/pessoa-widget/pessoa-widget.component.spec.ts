import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaWidgetComponent } from './pessoa-widget.component';

describe('PessoaWidgetComponent', () => {
  let component: PessoaWidgetComponent;
  let fixture: ComponentFixture<PessoaWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
