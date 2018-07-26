import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprogrammingComponent } from './comprogramming.component';

describe('ComprogrammingComponent', () => {
  let component: ComprogrammingComponent;
  let fixture: ComponentFixture<ComprogrammingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprogrammingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprogrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
