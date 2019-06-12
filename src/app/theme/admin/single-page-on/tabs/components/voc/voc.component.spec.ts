import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocComponent } from './voc.component';
import { Store, StoreModule } from '@ngrx/store';

describe('VocComponent', () => {
  let component: VocComponent;
  let fixture: ComponentFixture<VocComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ VocComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
