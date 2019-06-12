import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmsDocComponent } from './kms-doc.component';
import { Store, StoreModule } from '@ngrx/store';

describe('KmsDocComponent', () => {
  let component: KmsDocComponent;
  let fixture: ComponentFixture<KmsDocComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ KmsDocComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmsDocComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
