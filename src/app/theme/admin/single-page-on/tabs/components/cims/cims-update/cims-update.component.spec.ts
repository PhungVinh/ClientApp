import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsUpdateComponent } from './cims-update.component';

describe('CimsUpdateComponent', () => {
  let component: CimsUpdateComponent;
  let fixture: ComponentFixture<CimsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
