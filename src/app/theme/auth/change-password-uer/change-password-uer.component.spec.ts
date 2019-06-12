import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordUerComponent } from './change-password-uer.component';

describe('ChangePasswordUerComponent', () => {
  let component: ChangePasswordUerComponent;
  let fixture: ComponentFixture<ChangePasswordUerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordUerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordUerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
