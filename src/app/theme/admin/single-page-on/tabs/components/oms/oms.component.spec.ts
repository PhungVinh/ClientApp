import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmsComponent } from './oms.component';
import { Store, StoreModule } from '@ngrx/store';

describe('OmsComponent', () => {
  let component: OmsComponent;
  let fixture: ComponentFixture<OmsComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ OmsComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
