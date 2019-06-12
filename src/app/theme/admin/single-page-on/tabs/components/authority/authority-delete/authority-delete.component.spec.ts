import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityDeleteComponent } from './authority-delete.component';

describe('AuthorityDeleteComponent', () => {
  let component: AuthorityDeleteComponent;
  let fixture: ComponentFixture<AuthorityDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorityDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
