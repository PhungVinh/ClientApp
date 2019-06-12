import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePageOnComponent } from './single-page-on.component';

describe('SinglePageOnComponent', () => {
  let component: SinglePageOnComponent;
  let fixture: ComponentFixture<SinglePageOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePageOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePageOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
