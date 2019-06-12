import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrRelationComponent } from './attr-relation.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AttrRelationComponent', () => {
  let component: AttrRelationComponent;
  let fixture: ComponentFixture<AttrRelationComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AttrRelationComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrRelationComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
