import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CimsComponent } from './cims.component';
import { Store, StoreModule } from '@ngrx/store';

describe('CimsComponent', () => {
  let component: CimsComponent;
  let fixture: ComponentFixture<CimsComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ CimsComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CimsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
