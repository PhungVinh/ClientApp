import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsImportComponent } from './cims-import.component';

describe('CimsImportComponent', () => {
  let component: CimsImportComponent;
  let fixture: ComponentFixture<CimsImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimsImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
