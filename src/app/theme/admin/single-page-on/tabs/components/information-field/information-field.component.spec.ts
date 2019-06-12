import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationFieldComponent } from './information-field.component';
import { Store, StoreModule } from '@ngrx/store';

describe('InformationFieldComponent', () => {
  let component: InformationFieldComponent;
  let fixture: ComponentFixture<InformationFieldComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ InformationFieldComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationFieldComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
