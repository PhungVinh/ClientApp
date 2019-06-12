import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrFormComponent } from './attr-form.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AttrFormComponent', () => {
  let component: AttrFormComponent;
  let fixture: ComponentFixture<AttrFormComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AttrFormComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
