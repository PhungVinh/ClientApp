import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AttributesEffects } from './attributes.effects';

describe('AttributesEffects', () => {
  let actions$: Observable<any>;
  let effects: AttributesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AttributesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AttributesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
