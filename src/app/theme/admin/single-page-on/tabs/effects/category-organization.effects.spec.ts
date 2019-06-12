import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CategoryOrganizationEffects } from './category-organization.effects';

describe('CategoryOrganizationEffects', () => {
  let actions$: Observable<any>;
  let effects: CategoryOrganizationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryOrganizationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CategoryOrganizationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
