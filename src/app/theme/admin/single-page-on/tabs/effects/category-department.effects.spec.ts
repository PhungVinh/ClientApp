import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CategoryDepartmentEffects } from './category-department.effects';

describe('CategoryDepartmentEffects', () => {
  let actions$: Observable<any>;
  let effects: CategoryDepartmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryDepartmentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CategoryDepartmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
