import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { OrganizationEffects } from './organization.effects';

describe('OrganizationEffects', () => {
  let actions$: Observable<any>;
  let effects: OrganizationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(OrganizationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
