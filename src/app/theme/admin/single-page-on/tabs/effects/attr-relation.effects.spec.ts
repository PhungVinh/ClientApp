import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AttrRelationEffects } from './attr-relation.effects';

describe('AttrRelationEffects', () => {
  let actions$: Observable<any>;
  let effects: AttrRelationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AttrRelationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AttrRelationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
