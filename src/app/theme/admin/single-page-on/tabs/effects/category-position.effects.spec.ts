import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CategoryPositionEffects } from './category-position.effects';

describe('CategoryPositionEffects', () => {
  let actions$: Observable<any>;
  let effects: CategoryPositionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryPositionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CategoryPositionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
